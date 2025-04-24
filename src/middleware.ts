import { NextResponse, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
    raw: true,
  });
  const { pathname } = req.nextUrl;
  // const isAuthPage =
  //   pathname.startsWith("/auth/login") || pathname.startsWith("/auth/register");
  const isProtectedPage =
    pathname === "/" ||
    pathname.startsWith("/pos") ||
    pathname.startsWith("/report");

  // บล็อกการเข้าถึง /auth/register ทุกกรณี
  if (pathname.startsWith("/auth/register")) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  // ถ้ามี token และไปหน้า login ให้รีไดเร็กต์ไปหน้า dashboard
  if (token && pathname.startsWith("/auth/login")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // ถ้าไม่มี token และไปหน้า protected page ให้รีไดเร็กต์ไปหน้า login
  if (!token && isProtectedPage) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/pos/:path*",
    "/auth/login",
    "/auth/register",
    "/report/:path*",
  ],
};
