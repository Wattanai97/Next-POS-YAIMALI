import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";

export async function requireAuth() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    throw new Error("Unauthorized");
  }
  return session.user;
}
