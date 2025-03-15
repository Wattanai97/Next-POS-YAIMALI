import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
    raw: true,
  });

  const { pathname } = req.nextUrl;

  const isAuthPage =
    pathname.startsWith("/auth/login") || pathname.startsWith("/auth/register");
  const isProtectedPage =
    pathname === "/" ||
    pathname.startsWith("/orders") ||
    pathname.startsWith("/report");

  // ถ้า login แล้วเข้า auth page ให้ redirect ไปหน้า Dashboard
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // ถ้าไม่มี token และเข้าไปที่หน้า protected ให้ redirect ไปหน้า login
  if (!token && isProtectedPage) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/orders/:path*",
    "/auth/login",
    "/auth/register",
    "/report/:path*",
  ],
};
