"use client";
import React, { useEffect } from "react";
import SalesByProductReport from "@/components/sale-report/sales-by-product/sales-by-product-report";
import { redirect, usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { useLoadingStore } from "@/lib/store/useloding-errormessage";
import AuthLoading from "@/components/loading-error/auth-loading";
import LoadingSpinner from "@/components/loading-error/loading-spiner";
const ReportByProductPage = () => {
  const { isAuthLoading, isLoading } = useLoadingStore();
  const pathname = usePathname();
  const { data: session, status } = useSession();
  // token , session , login Check
  useEffect(() => {
    if (
      status === "unauthenticated" &&
      pathname === "/report/sales-by-product"
    ) {
      redirect("/auth/login");
    }
  }, [session?.user.username, status, pathname]);
  // Loading Check
  if (isLoading) return <LoadingSpinner />;
  if (isAuthLoading) return <AuthLoading />;
  return (
    <div>
      {/* SaleReport-Component */}
      <SalesByProductReport />
    </div>
  );
};

export default ReportByProductPage;
