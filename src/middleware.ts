import { NextResponse,NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
    raw: true,
  });

  const { pathname } = req.nextUrl;

  const isAuthPage = pathname.startsWith("/auth/login") || pathname.startsWith("/auth/register");
  const isProtectedPage = pathname === "/" || pathname.startsWith("/orders") || pathname.startsWith("/report");

  // ถ้ามี token และไปหน้า login หรือ register ก็รีไดเร็กต์ไปหน้า dashboard
  if (token && isAuthPage) {
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
    "/orders/:path*",
    "/auth/login",
    "/auth/register",
    "/report/:path*",
  ],
};
