"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { stripe } from "@/lib/stripe";

// ─── Helpers ─────────────────────────────────────────────────────────────────

async function getSchoolId(): Promise<string> {
  const cookieStore = await cookies();
  const id = cookieStore.get("auth_school_id")?.value;
  if (!id) throw new Error("You must be logged in as a school.");
  return id;
}

async function getAthleteId(): Promise<string> {
  const cookieStore = await cookies();
  const id = cookieStore.get("auth_athlete_id")?.value;
  if (!id) throw new Error("You must be logged in as an athlete.");
  return id;
}

// ─── createBooking ────────────────────────────────────────────────────────────
// Creates a booking (PENDING) and returns a Stripe Checkout URL for payment.
export async function createBooking(
  formData: FormData,
  athleteId: string
): Promise<{ checkoutUrl: string }> {
  const schoolId = await getSchoolId();

  const type           = formData.get("type")          as string;
  const dateStr        = formData.get("date")          as string;
  const timeStr        = formData.get("time")          as string;
  const schoolType     = formData.get("schoolType")    as string;
  const audienceSizeStr = formData.get("audienceSize") as string;
  const schoolNote     = formData.get("schoolNote")    as string;

  if (!type || !dateStr || !timeStr) {
    throw new Error("Missing required fields.");
  }

  const dateTime = new Date(`${dateStr}T${timeStr}`);
  if (isNaN(dateTime.getTime())) throw new Error("Invalid date/time.");
  if (dateTime < new Date()) throw new Error("Booking date must be in the future.");

  const [school, athlete] = await Promise.all([
    prisma.school.findUnique({ where: { id: schoolId, deletedAt: null }, select: { id: true, name: true } }),
    prisma.athlete.findUnique({ where: { id: athleteId, deletedAt: null }, select: { id: true, name: true, pricingSession: true, isVerified: true } }),
  ]);

  if (!school) throw new Error("Invalid school session.");
  if (!athlete || !athlete.isVerified) throw new Error("Athlete not found or not verified.");

  const sessionTypeMap: Record<string, "TALK" | "WORKSHOP" | "TRAINING"> = {
    Talk: "TALK",
    Workshop: "WORKSHOP",
    Training: "TRAINING",
  };
  const sessionType = sessionTypeMap[type] ?? "TALK";

  const pricingSnapshot = athlete.pricingSession; // lock price at booking time

  // Create Session and Booking in a transaction
  const booking = await prisma.$transaction(async (tx) => {
    const session = await tx.session.create({
      data: {
        title: `${type} with ${athlete.name}`,
        description: schoolNote || "",
        type: sessionType,
      },
    });

    return tx.booking.create({
      data: {
        athleteId,
        schoolId: school.id,
        sessionId: session.id,
        date: dateTime,
        audienceSize: audienceSizeStr ? parseInt(audienceSizeStr) : null,
        schoolType,
        schoolNote,
        pricingSnapshot,
      },
    });
  });

  // Amount in paise (INR). Add 18% GST.
  const baseAmount = Math.round(Number(pricingSnapshot) * 100);
  const gst = Math.round(baseAmount * 0.18);
  const totalAmount = baseAmount + gst;

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [
      {
        price_data: {
          currency: "inr",
          product_data: {
            name: `${type} with ${athlete.name}`,
            description: `${school.name} · ${dateTime.toLocaleDateString("en-IN")}`,
          },
          unit_amount: totalAmount,
        },
        quantity: 1,
      },
    ],
    payment_intent_data: {
      metadata: { bookingId: booking.id },
    },
    metadata: { bookingId: booking.id },
    success_url: `${baseUrl}/school/dashboard?booking=success`,
    cancel_url:  `${baseUrl}/school/book/${athleteId}?booking=cancelled`,
  });

  if (!checkoutSession.url) throw new Error("Failed to create Stripe Checkout session.");

  revalidatePath("/athlete/requests");
  revalidatePath("/school/dashboard");

  return { checkoutUrl: checkoutSession.url };
}

// ─── acceptBooking ────────────────────────────────────────────────────────────
export async function acceptBooking(bookingId: string) {
  const athleteId = await getAthleteId();

  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
    select: { athleteId: true, status: true },
  });

  if (!booking) throw new Error("Booking not found.");
  if (booking.athleteId !== athleteId) throw new Error("Unauthorized.");
  if (booking.status !== "PENDING") throw new Error("Only pending bookings can be accepted.");

  await prisma.booking.update({
    where: { id: bookingId },
    data: { status: "CONFIRMED" },
  });

  revalidatePath("/athlete/requests");
  revalidatePath("/athlete/sessions");
  revalidatePath("/athlete/dashboard");
}

// ─── declineBooking ───────────────────────────────────────────────────────────
export async function declineBooking(bookingId: string) {
  const athleteId = await getAthleteId();

  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
    select: { athleteId: true, status: true, escrow: true },
  });

  if (!booking) throw new Error("Booking not found.");
  if (booking.athleteId !== athleteId) throw new Error("Unauthorized.");
  if (booking.status !== "PENDING") throw new Error("Only pending bookings can be declined.");

  await prisma.booking.update({
    where: { id: bookingId },
    data: { status: "CANCELLED" },
  });

  // If payment was captured, trigger a refund via Stripe
  if (booking.escrow?.stripePaymentIntentId) {
    await stripe.refunds.create({
      payment_intent: booking.escrow.stripePaymentIntentId,
    });
    await prisma.escrowTransaction.update({
      where: { bookingId },
      data: { status: "REFUNDED" },
    });
  }

  revalidatePath("/athlete/requests");
  revalidatePath("/athlete/dashboard");
}

// ─── markSessionComplete ──────────────────────────────────────────────────────
export async function markSessionComplete(bookingId: string) {
  const athleteId = await getAthleteId();

  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
    select: { athleteId: true, status: true },
  });

  if (!booking) throw new Error("Booking not found.");
  if (booking.athleteId !== athleteId) throw new Error("Unauthorized.");
  if (booking.status !== "CONFIRMED") throw new Error("Only confirmed sessions can be marked complete.");

  await prisma.booking.update({
    where: { id: bookingId },
    data: { status: "COMPLETED" },
  });

  // TODO: Trigger payout to athlete's Stripe Connect account here.
  // await stripe.transfers.create({ ... })

  if (booking) {
    await prisma.escrowTransaction.updateMany({
      where: { bookingId, status: "HELD" },
      data: { status: "RELEASED" },
    });
  }

  revalidatePath("/athlete/sessions");
  revalidatePath("/athlete/earnings");
  revalidatePath("/athlete/dashboard");
}
