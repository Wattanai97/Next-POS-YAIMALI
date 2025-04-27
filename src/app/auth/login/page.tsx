"use client";
import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLoadingStore } from "@/lib/store/useloding-errormessage";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setIsLoading, isLoading } = useLoadingStore();
  const router = useRouter();

  const handleLogin = async () => {
    setIsLoading(false);
    const res = await signIn("credentials", {
      username,
      password,
      redirect: false,
    });
    if (res?.ok) {
      router.replace("/pos"); // เปลี่ยน push เป็น replace
      router.refresh(); // บังคับโหลด server ใหม่
      alert("Login สำเร็จ");
    } else {
      alert("Invalid username or password!");
    }
    setIsLoading(true);
  };
  return (
    <div className="xxs:mx-10 xs:mx-14 sm:mx-28 md:mx-44 flex flex-col items-center gap-4">
      <h2 className="text-slate-700 dark:text-green-400 xxs:text-xl sm:text-2xl md:text-3xl font-bold">
        Login
      </h2>
      <Input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="text-black dark:text-white placeholder:text-white"
      />
      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="text-black dark:text-white placeholder:text-white"
      />
      <Button onClick={handleLogin} disabled={isLoading}>
        Login
      </Button>
    </div>
  );
}
