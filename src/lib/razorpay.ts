import Razorpay from "razorpay";
import crypto from "crypto";

let _razorpay: Razorpay | null = null;

function getRazorpay(): Razorpay {
  if (!_razorpay) {
    const key_id = process.env.RAZORPAY_KEY_ID;
    const key_secret = process.env.RAZORPAY_KEY_SECRET;
    if (!key_id || !key_secret) {
      throw new Error("RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET must be set");
    }
    _razorpay = new Razorpay({ key_id, key_secret });
  }
  return _razorpay;
}

export const razorpay = new Proxy({} as Razorpay, {
  get(_t, prop) {
    return (getRazorpay() as any)[prop];
  },
});

export function getPublicKeyId(): string {
  const key = process.env.RAZORPAY_KEY_ID;
  if (!key) throw new Error("RAZORPAY_KEY_ID is not set");
  return key;
}

/**
 * Verify the signature returned by Razorpay Checkout after a successful payment.
 * Called by /api/razorpay/verify when the frontend handler fires.
 */
export function verifyCheckoutSignature(args: {
  orderId: string;
  paymentId: string;
  signature: string;
}): boolean {
  const secret = process.env.RAZORPAY_KEY_SECRET;
  if (!secret) throw new Error("RAZORPAY_KEY_SECRET is not set");

  const expected = crypto
    .createHmac("sha256", secret)
    .update(`${args.orderId}|${args.paymentId}`)
    .digest("hex");

  return safeEqual(expected, args.signature);
}

/**
 * Verify the X-Razorpay-Signature header on a webhook delivery.
 */
export function verifyWebhookSignature(rawBody: string, signature: string): boolean {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
  if (!secret) throw new Error("RAZORPAY_WEBHOOK_SECRET is not set");

  const expected = crypto
    .createHmac("sha256", secret)
    .update(rawBody)
    .digest("hex");

  return safeEqual(expected, signature);
}

function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(Buffer.from(a), Buffer.from(b));
}
