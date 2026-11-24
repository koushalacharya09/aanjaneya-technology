import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

type LimitResult = {
  success: boolean;
  remaining: number;
};

const memoryHits = new Map<string, number[]>();

function memoryLimit(
  key: string,
  limit: number,
  windowMs: number,
): LimitResult {
  const now = Date.now();
  const windowStart = now - windowMs;
  const hits = (memoryHits.get(key) ?? []).filter((t) => t > windowStart);
  if (hits.length >= limit) {
    memoryHits.set(key, hits);
    return { success: false, remaining: 0 };
  }
  hits.push(now);
  memoryHits.set(key, hits);
  return { success: true, remaining: limit - hits.length };
}

function getUpstash() {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  return new Ratelimit({
    redis: new Redis({ url, token }),
    limiter: Ratelimit.slidingWindow(5, "10 m"),
    analytics: false,
    prefix: "aanjaneya:leads",
  });
}

/** 5 requests per 10 minutes per IP */
export async function rateLimitLeads(ip: string): Promise<LimitResult> {
  const upstash = getUpstash();
  if (!upstash) {
    return memoryLimit(ip, 5, 10 * 60 * 1000);
  }
  const result = await upstash.limit(ip);
  return { success: result.success, remaining: result.remaining };
}
