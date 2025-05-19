import NextAuth from "next-auth"; // Import NextAuth
import { authOptions } from "@/lib/auth/authOptions"; // import authOptions ที่แยกไว้

const handler = NextAuth(authOptions); // สร้างตัวแปร handler เรียกใช้ NextAuth และส่ง authOptions เข้าไป

export { handler as GET, handler as POST }; // export ตัว handler ให้เป็นได้ทั้งแบบ GET และ แบบ POST 
