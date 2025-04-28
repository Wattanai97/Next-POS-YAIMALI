"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useLoadingStore } from "@/lib/store/useloding-errormessage";
import AuthLoading from "@/components/auth-loading";
interface AnimatedLabelProps {
  text: string;
}

const AnimatedLabel: React.FC<AnimatedLabelProps> = ({ text }) => {
  return (
    <label>
      {text.split("").map((char, index) => (
        <span key={index} style={{ transitionDelay: `${index * 50}ms` }}>
          {char}
        </span>
      ))}
    </label>
  );
};

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { isAuthLoading, setIsAuthLoading } = useLoadingStore();
  const router = useRouter();

  const handleLogin = async () => {
    setIsAuthLoading(false);
    const res = await signIn("credentials", {
      username,
      password,
      redirect: false,
    });
    if (res?.ok) {
      router.replace("/pos");
      router.refresh();
      alert("Login สำเร็จ");
    } else {
      alert("Invalid username or password!");
    }
    setIsAuthLoading(true);
  };

  if (isAuthLoading) return <AuthLoading />;

  return (
    <div className="flex flex-col items-center mt-8 gap-8">
      <h2 className="text-slate-950 italic dark:text-green-400 text-3xl font-bold">
        Login
      </h2>

      <div className="flex flex-col gap-y-1">
        {/* Username */}
        <div className="form-control">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <AnimatedLabel text="Username" />
        </div>

        {/* Password */}
        <div className="form-control">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <AnimatedLabel text="Password" />
        </div>

        {/* Button */}
        <button
          onClick={handleLogin}
          className="btn-navbar button-navbar mt-4"
          disabled={isAuthLoading}
        >
          Login
        </button>
      </div>
    </div>
  );
}
