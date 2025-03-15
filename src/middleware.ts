import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  console.log("🔹 Request Headers:", req.headers);

  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
    raw: true,
  });
  console.log("🔹 Middleware Token:", token);

  const { pathname } = req.nextUrl;

  const isAuthPage =
    pathname.startsWith("/auth/login") || pathname.startsWith("/auth/register");
  const isProtectedPage = pathname === "/" || pathname.startsWith("/orders") || pathname.startsWith("/report") || pathname.startsWith("/auth/register");

  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (!token && isProtectedPage) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/orders/:path*", "/auth/login", "/auth/register","/report/:path*"],
};
