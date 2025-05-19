import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import User from "@/models/user";
import { connectDB } from "@/lib/db";
interface CustomUser {
  id: string;
  username: string;
  role: string;
}
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      username: string;
      role: string;
    };
  }

  interface JWT {
    id: string;
    username: string;
    role: string;
  }
}

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.username || !credentials?.password) {
            throw new Error("⚠️ Username and password are required");
          }

          await connectDB();
          const user = await User.findOne({
            username: credentials.username,
          }).lean();

          if (!user) {
            throw new Error("❌ Invalid username or password");
          }

          const isMatch = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (!isMatch) {
            throw new Error("❌ Invalid username or password");
          }

          return {
            id: user._id.toString(),
            username: user.username,
            role: user.role,
          };
        } catch (error: unknown) {
          // เช็คว่าหาก error เป็น instance ของ Error
          if (error instanceof Error) {
            throw new Error(error.message || "❌ Something went wrong");
          } else {
            // กรณีที่ error ไม่ใช่ instance ของ Error
            throw new Error("❌ Something went wrong");
          }
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token = { ...token, ...user }; // สร้าง token ใหม่จาก user
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        id: String(token.id),
        username: String(token.username),
        role: String(token.role),
      };
      return session;
    },
  },
};
