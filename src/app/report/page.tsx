"use client";
import React, { useEffect } from "react";
import SalesReportPage from "@/components/sale-report";
import { redirect, usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { useLoadingStore } from "@/lib/store/useloding-errormessage";
import AuthLoading from "@/components/auth-loading";
import LoadingSpinner from "@/components/loading-spiner";
const Page = () => {
  const { isAuthLoading, isLoading } = useLoadingStore();
  const pathname = usePathname();
  const { data: session, status } = useSession();
  useEffect(() => {
    if (status === "unauthenticated" && pathname === "/report") {
      redirect("/auth/login");
    }
  }, [session?.user.username, status, pathname]);
  if (isLoading) return <LoadingSpinner />;
  if (isAuthLoading) return <AuthLoading />;
  return (
    <div>
      <SalesReportPage />
    </div>
  );
};

export default Page;
