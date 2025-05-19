"use client";
import React, { useEffect } from "react";
import SalesReport from "@/components/sale-report/sale-report";
import { redirect, usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { useLoadingStore } from "@/lib/store/useloding-errormessage";
import AuthLoading from "@/components/loading-error/auth-loading";
import LoadingSpinner from "@/components/loading-error/loading-spiner";
const ReportPage = () => {
  const { isAuthLoading, isLoading } = useLoadingStore();
  const pathname = usePathname();
  const { data: session, status } = useSession();
  // token , session , login Check
  useEffect(() => {
    if (status === "unauthenticated" && pathname === "/report") {
      redirect("/auth/login");
    }
  }, [session?.user.username, status, pathname]);
  // Loading Check
  if (isLoading) return <LoadingSpinner />;
  if (isAuthLoading) return <AuthLoading />;
  return (
    <div>
      {/* SaleReport-Component */}
      <SalesReport />
    </div>
  );
};

export default ReportPage;
