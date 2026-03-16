import { SignJWT, jwtVerify } from "jose";
import { NextRequest } from "next/server";
import { timingSafeEqual } from "crypto";

const COOKIE_NAME = "admin_token";

function getSecret() {
  return new TextEncoder().encode(process.env.ADMIN_SECRET!);
}

export async function createAdminToken(): Promise<string> {
  return new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getSecret());
}

export async function verifyAdminToken(request: NextRequest): Promise<boolean> {
  const token = request.cookies.get(COOKIE_NAME)?.value;
  if (!token) return false;

  try {
    await jwtVerify(token, getSecret());
    return true;
  } catch {
    return false;
  }
}

/**
 * Constant-time password comparison to prevent timing attacks.
 */
export function verifyPassword(password: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;

  const a = Buffer.from(password);
  const b = Buffer.from(expected);

  // Pad to same length to avoid leaking length info
  if (a.length !== b.length) {
    const padded = Buffer.alloc(b.length);
    a.copy(padded);
    try { timingSafeEqual(padded, b); } catch { /* ignore */ }
    return false;
  }

  return timingSafeEqual(a, b);
}
