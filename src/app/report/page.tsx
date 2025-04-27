"use client";
import React, { useEffect } from "react";
import SalesReportPage from "@/components/sale-report";
import { redirect, usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
const Page = () => {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  useEffect(() => {
    if (status === "unauthenticated" && pathname === "/report") {
      redirect("/auth/login");
    }
  }, [session?.user.username, status, pathname]);
  return (
    <div>
      <SalesReportPage />
    </div>
  );
};

export default Page;
