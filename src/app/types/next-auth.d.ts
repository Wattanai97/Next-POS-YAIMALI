// next-auth.d.ts
import { User as NextAuthUser } from "next-auth";
import { Session as NextAuthSession } from "next-auth";
import { JWT } from "next-auth/jwt";

// ขยาย type ของ Session และ JWT เพื่อรองรับ username
declare module "next-auth" {
  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      username?: string | null;  // เพิ่ม username
    };
  }

  interface JWT {
    user?: {
      username?: string | null;  // เพิ่ม username
    };
  }
}
