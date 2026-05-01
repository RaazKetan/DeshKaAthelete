import { NextRequest, NextResponse } from "next/server";
import { verifyWebhookSignature } from "@/lib/razorpay";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

interface RazorpayPayment {
  id: string;
  order_id: string;
  amount: number;
  currency: string;
  status: string;
  notes?: Record<string, string>;
}

interface RazorpayRefund {
  id: string;
  payment_id: string;
  amount: number;
  status: string;
}

export async function POST(request: NextRequest) {
  const rawBody = await request.text();
  const signature = request.headers.get("x-razorpay-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing x-razorpay-signature header" }, { status: 400 });
  }

  let valid = false;
  try {
    valid = verifyWebhookSignature(rawBody, signature);
  } catch (err) {
    console.error("Razorpay webhook config error:", err);
    return NextResponse.json({ error: "Webhook not configured" }, { status: 500 });
  }

  if (!valid) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  let event: { event: string; payload: any };
  try {
    event = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  try {
    switch (event.event) {
      // School successfully paid — funds captured by Razorpay, mark escrow as HELD.
      case "payment.captured": {
        const payment = event.payload.payment.entity as RazorpayPayment;
        const bookingId = payment.notes?.bookingId;
        if (!bookingId) break;

        const booking = await prisma.booking.findUnique({
          where: { id: bookingId },
          select: { id: true, status: true, pricingSnapshot: true },
        });
        if (!booking || booking.status !== "PENDING_PAYMENT") break;

        await prisma.escrowTransaction.upsert({
          where: { bookingId },
          create: {
            bookingId,
            amount: booking.pricingSnapshot ?? 0,
            currency: payment.currency || "INR",
            status: "HELD",
            razorpayOrderId: payment.order_id,
            razorpayPaymentId: payment.id,
          },
          update: {
            status: "HELD",
            razorpayOrderId: payment.order_id,
            razorpayPaymentId: payment.id,
          },
        });
        break;
      }

      // Payment failed — cancel the booking.
      case "payment.failed": {
        const payment = event.payload.payment.entity as RazorpayPayment;
        const bookingId = payment.notes?.bookingId;
        if (!bookingId) break;

        await prisma.booking.updateMany({
          where: { id: bookingId, status: "PENDING_PAYMENT" },
          data: { status: "CANCELLED" },
        });
        break;
      }

      // Refund processed — update escrow record.
      case "refund.processed": {
        const refund = event.payload.refund.entity as RazorpayRefund;
        await prisma.escrowTransaction.updateMany({
          where: { razorpayPaymentId: refund.payment_id },
          data: {
            status: "REFUNDED",
            razorpayRefundId: refund.id,
          },
        });
        break;
      }
    }
  } catch (err) {
    console.error("Razorpay webhook handler error:", err);
    return NextResponse.json({ error: "Handler failed" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
