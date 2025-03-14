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
      <div className="xxs:mx-10 xs:mx-14 sm:mx-28 md:mx-44 flex flex-col items-center gap-4">
        <h2 className="xxs:text-xl sm:text-2xl md:text-3xl font-bold text-white">Register</h2>
        
        <Input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)} className="text-white placeholder:text-white"

        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} className="text-white placeholder:text-white"
        />
        <Button onClick={handleRegister} disabled={loading}>
          Register
        </Button>
      </div>
    </div>
  );
}
