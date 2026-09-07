/**
 * Tiny fixed-window throttle keyed by client IP. In-memory, per server
 * instance: adequate for a brochure site's contact and report endpoints; move
 * to a shared store (KV / Upstash) if the site ever scales horizontally.
 */
const buckets = new Map<string, number[]>();

export function isRateLimited(
  key: string,
  { max, windowMs }: { max: number; windowMs: number },
  now = Date.now()
): boolean {
  const since = now - windowMs;
  const hits = (buckets.get(key) ?? []).filter((t) => t > since);
  if (hits.length >= max) {
    buckets.set(key, hits);
    return true;
  }
  hits.push(now);
  buckets.set(key, hits);
  // Opportunistic cleanup so the map cannot grow without bound.
  if (buckets.size > 5000) {
    for (const [k, v] of buckets) if (!v.some((t) => t > since)) buckets.delete(k);
  }
  return false;
}

/** Best-effort client IP behind the usual proxies. */
export function clientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return req.headers.get("x-real-ip")?.trim() || "unknown";
}

/** Test hook. */
export function resetRateLimits(): void {
  buckets.clear();
}
