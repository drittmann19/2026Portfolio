import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const EVALS_PER_DAY = 3;

let limiter: Ratelimit | null = null;
let warnedMissingCreds = false;

function getLimiter(): Ratelimit | null {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    if (!warnedMissingCreds) {
      console.warn(
        "[/api/evaluate] Upstash credentials not set; rate limiting is disabled. Set UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN before going live.",
      );
      warnedMissingCreds = true;
    }
    return null;
  }

  if (!limiter) {
    limiter = new Ratelimit({
      redis: new Redis({ url, token }),
      limiter: Ratelimit.slidingWindow(EVALS_PER_DAY, "1 d"),
      prefix: "jd-evaluator",
      analytics: false,
    });
  }
  return limiter;
}

export interface RateLimitResult {
  allowed: boolean;
  /** Seconds until the window resets, present only when blocked. */
  retryAfterSeconds?: number;
}

export async function checkRateLimit(identifier: string): Promise<RateLimitResult> {
  const rl = getLimiter();
  if (!rl) return { allowed: true }; // Not configured (local dev) — fail open.

  try {
    const { success, reset } = await rl.limit(identifier);
    if (success) return { allowed: true };
    return {
      allowed: false,
      retryAfterSeconds: Math.max(0, Math.ceil((reset - Date.now()) / 1000)),
    };
  } catch (err) {
    // Redis unreachable: don't break the feature. Backstops are the $10 spend
    // cap and the 8,000-char input cap.
    console.error("[/api/evaluate] Rate limit check failed, allowing request:", err);
    return { allowed: true };
  }
}
