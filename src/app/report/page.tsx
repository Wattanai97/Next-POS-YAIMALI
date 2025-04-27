"use client";
import React, { useEffect } from "react";
import SalesReportPage from "@/components/sale-report";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
const page = () => {
  const router = useRouter();
  const { data: session } = useSession();
  useEffect(() => {
    if (!session?.user.username) {
      router.push("/auth/login");
    }
  }, [session?.user.username]);
  return (
    <div>
      <SalesReportPage />
    </div>
  );
};

export default page;
