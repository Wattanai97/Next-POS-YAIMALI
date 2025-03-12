"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const APIBASEURL = process.env.NEXTAUTH_URL || "http://localhost:3000";
  const handleRegister = async () => {
    setLoading(true);
    const res = await fetch(`${APIBASEURL}/api/auth/register`, {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      router.push("/auth/login");
    } else {
      alert("Registration failed!");
    }
    setLoading(false);
  };

  return (
    <div>
      <div className="mx-20 flex flex-col items-center gap-4">
        <h2 className="text-xl font-bold">Register</h2>
        
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
        <Button onClick={handleRegister} disabled={loading}>
          Register
        </Button>
      </div>
    </div>
  );
}
