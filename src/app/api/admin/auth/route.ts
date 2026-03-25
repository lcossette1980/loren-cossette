import { NextRequest, NextResponse } from "next/server";
import { verifyPassword, createAdminToken } from "@/lib/admin-auth";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { password } = body;

    if (!password || typeof password !== "string") {
      return NextResponse.json(
        { error: "Password is required." },
        { status: 400 }
      );
    }

    const hasAdminPw = !!process.env.ADMIN_PASSWORD;
    const hasAdminSecret = !!process.env.ADMIN_SECRET;
    console.log("[admin-auth] ADMIN_PASSWORD set:", hasAdminPw, "| ADMIN_SECRET set:", hasAdminSecret, "| password length:", password.length);

    if (!process.env.ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: "Server misconfigured: ADMIN_PASSWORD env var is not set." },
        { status: 401 }
      );
    }

    if (!process.env.ADMIN_SECRET) {
      return NextResponse.json(
        { error: "Server misconfigured: ADMIN_SECRET env var is not set." },
        { status: 401 }
      );
    }

    if (!verifyPassword(password)) {
      return NextResponse.json(
        { error: "Invalid password." },
        { status: 401 }
      );
    }

    const token = await createAdminToken();

    const response = NextResponse.json({ success: true }, { status: 200 });

    response.cookies.set("admin_token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error) {
    console.error("Auth login error:", error);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  try {
    const response = NextResponse.json({ success: true }, { status: 200 });

    response.cookies.set("admin_token", "", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
      maxAge: 0,
    });

    return response;
  } catch (error) {
    console.error("Auth logout error:", error);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
