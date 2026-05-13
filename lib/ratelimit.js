import { LRUCache } from 'lru-cache';

function makeLimiter({ max, windowMs, capacity = 5000 }) {
  const cache = new LRUCache({ max: capacity, ttl: windowMs, updateAgeOnGet: false });

  return function check(key) {
    if (!key) return { ok: true };

    const now = Date.now();
    const existing = cache.get(key);
    const entry = existing ?? { count: 0, resetAt: now + windowMs };
    const remaining = entry.resetAt - now;

    if (entry.count >= max) {
      const retryAfter = Math.max(1, Math.ceil(remaining / 1000));
      return { ok: false, retryAfter };
    }

    entry.count += 1;
    cache.set(key, entry, { ttl: remaining > 0 ? remaining : windowMs });
    return { ok: true };
  };
}

export const contactLimiter = makeLimiter({ max: 5, windowMs: 10 * 60 * 1000 });
export const karriereLimiter = makeLimiter({ max: 3, windowMs: 60 * 60 * 1000 });

export function clientIp(request) {
  const xff = request.headers.get('x-forwarded-for');
  if (xff) return xff.split(',')[0].trim();
  return request.headers.get('x-real-ip') || 'unknown';
}
