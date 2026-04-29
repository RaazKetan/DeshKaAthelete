import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import Stripe from "stripe";

// Disable Next.js body parsing — Stripe needs the raw body to verify the signature.
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const body      = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing stripe-signature" }, { status: 400 });
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error("STRIPE_WEBHOOK_SECRET is not configured");
    return NextResponse.json({ error: "Webhook not configured" }, { status: 500 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err: any) {
    console.error("Stripe webhook signature verification failed:", err.message);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {
    switch (event.type) {
      // School successfully paid — funds are captured, create the escrow record.
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const bookingId = session.metadata?.bookingId;
        if (!bookingId) break;

        const paymentIntentId = session.payment_intent as string;

        // Check booking still exists and is PENDING
        const booking = await prisma.booking.findUnique({
          where: { id: bookingId },
          select: { id: true, status: true, pricingSnapshot: true },
        });
        if (!booking || booking.status !== "PENDING") break;

        await prisma.escrowTransaction.upsert({
          where: { bookingId },
          create: {
            bookingId,
            amount: booking.pricingSnapshot ?? 0,
            currency: "INR",
            status: "HELD",
            stripePaymentIntentId: paymentIntentId,
          },
          update: {
            status: "HELD",
            stripePaymentIntentId: paymentIntentId,
          },
        });

        break;
      }

      // Payment failed — cancel the booking.
      case "payment_intent.payment_failed": {
        const pi = event.data.object as Stripe.PaymentIntent;
        const bookingId = pi.metadata?.bookingId;
        if (!bookingId) break;

        await prisma.booking.updateMany({
          where: { id: bookingId, status: "PENDING" },
          data: { status: "CANCELLED" },
        });
        break;
      }
    }
  } catch (err) {
    console.error("Webhook handler error:", err);
    return NextResponse.json({ error: "Handler failed" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
