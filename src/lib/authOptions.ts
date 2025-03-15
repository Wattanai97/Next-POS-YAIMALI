import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
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
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
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
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token = { ...token, ...user };
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
  pages: {
    signIn: "/auth/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
};
