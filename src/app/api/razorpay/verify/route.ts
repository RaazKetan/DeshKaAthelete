import { NextRequest, NextResponse } from "next/server";
import { verifyCheckoutSignature } from "@/lib/razorpay";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

/**
 * Called by the school booking client after the Razorpay Checkout modal succeeds.
 * Verifies the signature and marks the EscrowTransaction as HELD synchronously
 * so the user lands on a confirmed dashboard. The webhook is the durable source
 * of truth — this endpoint is for fast UX feedback.
 */
export async function POST(request: NextRequest) {
  let body: { razorpay_order_id?: string; razorpay_payment_id?: string; razorpay_signature?: string; bookingId?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, bookingId } = body;
  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !bookingId) {
    return NextResponse.json({ ok: false, error: "Missing required fields" }, { status: 400 });
  }

  const valid = verifyCheckoutSignature({
    orderId: razorpay_order_id,
    paymentId: razorpay_payment_id,
    signature: razorpay_signature,
  });

  if (!valid) {
    return NextResponse.json({ ok: false, error: "Invalid signature" }, { status: 400 });
  }

  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
    select: { id: true, status: true, pricingSnapshot: true },
  });
  if (!booking) {
    return NextResponse.json({ ok: false, error: "Booking not found" }, { status: 404 });
  }
  if (booking.status !== "PENDING_PAYMENT") {
    // already handled by webhook — idempotent
    return NextResponse.json({ ok: true, alreadyProcessed: true });
  }

  await prisma.escrowTransaction.upsert({
    where: { bookingId },
    create: {
      bookingId,
      amount: booking.pricingSnapshot ?? 0,
      currency: "INR",
      status: "HELD",
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
    },
    update: {
      status: "HELD",
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
    },
  });

  return NextResponse.json({ ok: true });
}
