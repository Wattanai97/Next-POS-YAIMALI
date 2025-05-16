// หน้าหลักแสดง DashBoard Component
"use client";
import Dashboard from "@/components/dash-board";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import useFetchOrders from "@/hooks/use-fetch-orders";
import { useEffect } from "react";
import LoadingSpinner from "@/components/loading-spiner";
import ErrorMessage from "@/components/error-message";
import { useLoadingStore } from "@/lib/store/useloding-errormessage";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { usePathname } from "next/navigation";
import AuthLoading from "@/components/auth-loading";
export default function Home() {
  // const { selectedItems } = useNodesStore();
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const { isLoading, error, isAuthLoading } = useLoadingStore();
  const { fetchOrders } = useFetchOrders();
  // fetch Order ทั้งหมดจาก database
  useEffect(() => {
    fetchOrders();
  }, []);
  // Check stutus , ถ้าไม่ได้ login แล้วมาหน้านี้ให้ redirect ไปที่ /auth/login
  useEffect(() => {
    if (status === "unauthenticated" && pathname === "/") {
      redirect("/auth/login");
    }
  }, [status, pathname, session?.user.username]);
  // useEffect(() => {
  //   console.log(selectedItems);
  // }, [selectedItems]);
  // Loading Check
  if (isLoading) return <LoadingSpinner />;
  if (isAuthLoading) return <AuthLoading />;
  if (error) return <ErrorMessage error={error} />;
  return (
    <>
      <SidebarProvider>
        {" "}
        {/*Sidebar-Provider*/}
        <AppSidebar /> {/* Sidebar-Component Only Display on / page */}
        <div className=" my-4 font-bold w-screen">
          <p className="text-center text-black dark:text-white xxs:text-lg sm:text-2xl md:text-3xl mb-4 font-bold">
            Dashboard
          </p>
          {/* DashBoard-Component */}
          <Dashboard />
        </div>
      </SidebarProvider>
    </>
  );
}
