"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    setLoading(true);
    const res = await signIn("credentials", {
      username,
      password,
      redirect: false,
    });

    if (res?.ok) {
      router.replace("/");
    } else {
      alert("Invalid username or password!");
    }
    setLoading(false);
  };

  return (
    <div className="mx-20 flex flex-col items-center gap-4">
      <h2 className="text-xl font-bold">Login</h2>
      <Input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button onClick={handleLogin} disabled={loading}>
        Login
      </Button>
    </div>
  );
}
