import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { headers } from "next/headers";

// ─── Backend selection ───────────────────────────────────────────────────────
//
// Production: Upstash Redis (set UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN).
// Dev / local: in-memory map fallback. Per-instance only — won't share state
// across serverless cold starts or instances. Good enough for local burst protection;
// Upstash is required for real abuse protection in prod.
//
// Both backends conform to the `Limiter` shape so callers don't care which is active.

let _redis: Redis | null | undefined;
function getRedis(): Redis | null {
  if (_redis !== undefined) return _redis;
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) {
    _redis = null;
    if (process.env.NODE_ENV === "production") {
      console.warn("[rate-limit] Upstash env vars missing; falling back to in-memory limiter.");
    }
    return null;
  }
  _redis = new Redis({ url, token });
  return _redis;
}

type Window = `${number} ${"s" | "m" | "h" | "d"}`;

interface LimitConfig {
  tokens: number;
  window: Window;
  prefix: string;
}

interface Limiter {
  limit(key: string): Promise<{ success: boolean; remaining: number; reset: number }>;
}

// ─── In-memory fallback ──────────────────────────────────────────────────────

const memStore = new Map<string, { count: number; resetAt: number }>();

function parseWindowMs(window: Window): number {
  const [n, unit] = window.split(" ");
  const num = parseInt(n);
  switch (unit) {
    case "s": return num * 1_000;
    case "m": return num * 60_000;
    case "h": return num * 3_600_000;
    case "d": return num * 86_400_000;
    default: return 60_000;
  }
}

function memoryLimiter(cfg: LimitConfig): Limiter {
  const windowMs = parseWindowMs(cfg.window);
  return {
    async limit(key: string) {
      const fullKey = `${cfg.prefix}:${key}`;
      const now = Date.now();
      const entry = memStore.get(fullKey);
      if (!entry || entry.resetAt < now) {
        memStore.set(fullKey, { count: 1, resetAt: now + windowMs });
        return { success: true, remaining: cfg.tokens - 1, reset: now + windowMs };
      }
      if (entry.count >= cfg.tokens) {
        return { success: false, remaining: 0, reset: entry.resetAt };
      }
      entry.count++;
      return { success: true, remaining: cfg.tokens - entry.count, reset: entry.resetAt };
    },
  };
}

function createLimiter(cfg: LimitConfig): Limiter {
  const redis = getRedis();
  if (!redis) return memoryLimiter(cfg);
  const rl = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(cfg.tokens, cfg.window),
    prefix: `crests:${cfg.prefix}`,
    analytics: true,
  });
  return {
    async limit(key: string) {
      const r = await rl.limit(key);
      return { success: r.success, remaining: r.remaining, reset: r.reset };
    },
  };
}

// ─── Per-route limiter instances ─────────────────────────────────────────────

export const signupLimit  = createLimiter({ tokens: 5,  window: "1 m", prefix: "signup" });
export const authLimit    = createLimiter({ tokens: 10, window: "1 m", prefix: "auth" });
export const otpLimit     = createLimiter({ tokens: 3,  window: "5 m", prefix: "otp" });
export const bookingLimit = createLimiter({ tokens: 10, window: "1 m", prefix: "booking" });
export const adminLimit   = createLimiter({ tokens: 30, window: "1 m", prefix: "admin" });

// ─── Helpers ─────────────────────────────────────────────────────────────────

/**
 * Read the originating client IP from the request headers. Vercel/most
 * proxies set `x-forwarded-for` (comma-separated, first entry is the client).
 * Falls back to `x-real-ip` and finally `anonymous` so the limiter still works.
 */
export async function getClientIp(): Promise<string> {
  const h = await headers();
  const fwd = h.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0]!.trim();
  return h.get("x-real-ip") ?? "anonymous";
}

export class RateLimitError extends Error {
  reset: number;
  constructor(reset: number) {
    super("Too many requests. Please try again in a moment.");
    this.name = "RateLimitError";
    this.reset = reset;
  }
}

/** Limit + throw RateLimitError on exhaustion. */
export async function enforce(limiter: Limiter, key: string): Promise<void> {
  const r = await limiter.limit(key);
  if (!r.success) throw new RateLimitError(r.reset);
}
