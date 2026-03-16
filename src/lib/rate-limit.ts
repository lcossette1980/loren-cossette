interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const WINDOW_MS = 24 * 60 * 60 * 1000; // 24 hours
const MAX_REQUESTS = 5;
const CLEANUP_INTERVAL = 60 * 60 * 1000; // 1 hour

// Burst protection: max 2 requests per minute per IP
const BURST_WINDOW_MS = 60 * 1000;
const BURST_MAX = 2;

const store = new Map<string, RateLimitEntry>();
const burstStore = new Map<string, RateLimitEntry>();
let lastCleanup = Date.now();

function cleanup() {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL) return;
  lastCleanup = now;
  for (const [key, entry] of store) {
    if (now > entry.resetAt) store.delete(key);
  }
  for (const [key, entry] of burstStore) {
    if (now > entry.resetAt) burstStore.delete(key);
  }
}

export function checkRateLimit(ip: string): {
  allowed: boolean;
  remaining: number;
  retryAfter?: number;
} {
  cleanup();
  const now = Date.now();

  // ── Burst check (2 per minute) ──
  const burst = burstStore.get(ip);
  if (burst && now <= burst.resetAt && burst.count >= BURST_MAX) {
    const retryAfter = Math.ceil((burst.resetAt - now) / 1000);
    return { allowed: false, remaining: 0, retryAfter };
  }
  if (!burst || now > burst.resetAt) {
    burstStore.set(ip, { count: 1, resetAt: now + BURST_WINDOW_MS });
  } else {
    burst.count++;
  }

  // ── Daily limit check (5 per 24h) ──
  const entry = store.get(ip);

  if (!entry || now > entry.resetAt) {
    store.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return { allowed: true, remaining: MAX_REQUESTS - 1 };
  }

  if (entry.count >= MAX_REQUESTS) {
    const retryAfter = Math.ceil((entry.resetAt - now) / 1000);
    return { allowed: false, remaining: 0, retryAfter };
  }

  entry.count++;
  return { allowed: true, remaining: MAX_REQUESTS - entry.count };
}
