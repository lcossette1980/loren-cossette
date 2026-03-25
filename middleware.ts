import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const ADMIN_COOKIE = "admin_token";

function getSecret() {
  const secret = process.env.ADMIN_SECRET;
  if (!secret) return null;
  return new TextEncoder().encode(secret);
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const response = NextResponse.next();

  // ── Security headers (all routes) ──
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-XSS-Protection", "1; mode=block");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=()"
  );

  // ── Admin route protection ──
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const token = request.cookies.get(ADMIN_COOKIE)?.value;
    const secret = getSecret();

    if (!token || !secret) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    try {
      await jwtVerify(token, secret);
    } catch {
      // Invalid or expired token
      const loginUrl = new URL("/admin/login", request.url);
      const res = NextResponse.redirect(loginUrl);
      // Clear the bad cookie
      res.cookies.set(ADMIN_COOKIE, "", {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        path: "/",
        maxAge: 0,
      });
      return res;
    }
  }

  // ── Admin API protection (belt + suspenders with route-level checks) ──
  // Exclude the auth endpoint — it handles its own password verification
  if (pathname.startsWith("/api/admin") && !pathname.startsWith("/api/admin/auth")) {
    const token = request.cookies.get(ADMIN_COOKIE)?.value;
    const secret = getSecret();

    if (!token || !secret) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    try {
      await jwtVerify(token, secret);
    } catch {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }
  }

  return response;
}

export const config = {
  matcher: [
    // Security headers on all pages
    "/((?!_next/static|_next/image|favicon.ico|images/).*)",
  ],
};
