import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function requireAuth() {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("Unauthorized"); // ถ้าไม่มี session ให้โยน error ไป
  }
  return session.user; // คืนค่าผู้ใช้ที่ถูกต้อง
}
