import crypto from "crypto";

const EXPIRY_MS = 60 * 60 * 1000; // 1 hour
const CLEANUP_INTERVAL_MS = 15 * 60 * 1000; // 15 minutes

interface ResetTokenEntry {
  hashedToken: string;
  email: string;
  expiresAt: number;
}

// In-memory store: keyed by hashed token
const tokenStore = new Map<string, ResetTokenEntry>();

// Periodically remove expired tokens to prevent unbounded memory growth
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of tokenStore) {
    if (now > entry.expiresAt) {
      tokenStore.delete(key);
    }
  }
}, CLEANUP_INTERVAL_MS);

function hashToken(token: string): string {
  return crypto.createHash("sha256").update(token).digest("hex");
}

/** Generate a secure random token, store its hash with expiry, and return the raw token. */
export function createResetToken(email: string): string {
  const rawToken = crypto.randomBytes(32).toString("hex");
  const hashedToken = hashToken(rawToken);
  tokenStore.set(hashedToken, {
    hashedToken,
    email,
    expiresAt: Date.now() + EXPIRY_MS,
  });
  return rawToken;
}

/** Validate a raw token. Returns the associated email if valid, or null if invalid/expired. */
export function validateResetToken(rawToken: string): string | null {
  const hashedToken = hashToken(rawToken);
  const entry = tokenStore.get(hashedToken);
  if (!entry) return null;
  if (Date.now() > entry.expiresAt) {
    tokenStore.delete(hashedToken);
    return null;
  }
  return entry.email;
}

/** Consume (invalidate) a raw token after successful use. */
export function consumeResetToken(rawToken: string): void {
  const hashedToken = hashToken(rawToken);
  tokenStore.delete(hashedToken);
}
