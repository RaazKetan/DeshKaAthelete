"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { razorpay, getPublicKeyId } from "@/lib/razorpay";
import { bookingSchema, parseFormData } from "@/lib/validation";
import { bookingLimit, enforce } from "@/lib/rate-limit";

// ─── Helpers ─────────────────────────────────────────────────────────────────

function firstError(errors: Record<string, string>): string {
  const key = Object.keys(errors)[0];
  return errors[key] ?? "Validation failed.";
}

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

export interface RazorpayBookingOrder {
  bookingId: string;
  orderId: string;
  amount: number;       // paise
  currency: string;
  keyId: string;
  name: string;
  description: string;
  prefill: {
    name?: string;
    contact?: string;
  };
}

// ─── createBooking ────────────────────────────────────────────────────────────
// Creates a PENDING booking and a Razorpay Order. The client opens Razorpay
// Checkout with these details; on success, /api/razorpay/verify confirms the
// payment and the webhook persists the EscrowTransaction.
export async function createBooking(
  formData: FormData,
  athleteId: string,
): Promise<RazorpayBookingOrder> {
  const schoolId = await getSchoolId();

  // Limit by schoolId (the authenticated identity) so a single school can't
  // hammer the booking endpoint with bad data. IP would let one school behind
  // a NAT block another.
  await enforce(bookingLimit, schoolId);

  const parsed = parseFormData(bookingSchema, formData);
  if (!parsed.ok) throw new Error(firstError(parsed.errors));
  const { type, date: dateStr, time: timeStr, schoolType, audienceSize, schoolNote } = parsed.data;

  const dateTime = new Date(`${dateStr}T${timeStr}`);
  if (dateTime < new Date()) throw new Error("Booking date must be in the future.");

  const [school, athlete] = await Promise.all([
    prisma.school.findUnique({
      where: { id: schoolId, deletedAt: null },
      select: { id: true, name: true, contact: true },
    }),
    prisma.athlete.findUnique({
      where: { id: athleteId, deletedAt: null },
      select: { id: true, name: true, pricingSession: true, isVerified: true },
    }),
  ]);

  if (!school) throw new Error("Invalid school session.");
  if (!athlete || !athlete.isVerified) throw new Error("Crest not found or not verified.");

  const sessionTypeMap: Record<string, "TALK" | "WORKSHOP" | "TRAINING"> = {
    Talk: "TALK",
    Workshop: "WORKSHOP",
    Training: "TRAINING",
  };
  const sessionType = sessionTypeMap[type] ?? "TALK";

  const pricingSnapshot = athlete.pricingSession;

  // Create Session + Booking in a single transaction. Status is PENDING until
  // payment is captured by the webhook (or /verify endpoint).
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
        audienceSize,
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

  // Razorpay Order with bookingId in notes for webhook + verify lookup.
  const order = await razorpay.orders.create({
    amount: totalAmount,
    currency: "INR",
    receipt: booking.id,
    notes: { bookingId: booking.id, schoolId: school.id, athleteId },
  });

  revalidatePath("/athlete/requests");
  revalidatePath("/school/dashboard");

  return {
    bookingId: booking.id,
    orderId: order.id,
    amount: totalAmount,
    currency: "INR",
    keyId: getPublicKeyId(),
    name: "Crests by DeshKa",
    description: `${type} with ${athlete.name} · ${school.name}`,
    prefill: {
      name: school.name,
      contact: school.contact ?? undefined,
    },
  };
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

  // If the school already paid, refund the captured payment via Razorpay.
  if (booking.escrow?.razorpayPaymentId) {
    const refund = await razorpay.payments.refund(booking.escrow.razorpayPaymentId, {
      // Full refund — pass speed: "normal" or "optimum" if needed.
      speed: "normal",
    });
    await prisma.escrowTransaction.update({
      where: { bookingId },
      data: {
        status: "REFUNDED",
        razorpayRefundId: refund.id,
      },
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

  // TODO: Trigger payout to Crest via Razorpay Route (transfers).
  // await razorpay.transfers.create({ ... })

  await prisma.escrowTransaction.updateMany({
    where: { bookingId, status: "HELD" },
    data: { status: "RELEASED" },
  });

  revalidatePath("/athlete/sessions");
  revalidatePath("/athlete/earnings");
  revalidatePath("/athlete/dashboard");
}
