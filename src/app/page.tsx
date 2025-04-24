"use client";
import Dashboard from "@/components/dash-board";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import useFetchOrders from "@/hooks/use-fetch-orders";
import { useEffect } from "react";
import LoadingSpinner from "@/components/loading-spiner";
import ErrorMessage from "@/components/error-message";
import { useLoadingStore } from "@/lib/store/useloding-errormessage";
export default function Home() {
  const { isLoading, error } = useLoadingStore();
  const { fetchOrders } = useFetchOrders();
  useEffect(() => {
    fetchOrders();
  }, []);
  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className=" my-4 font-bold w-screen">
        <p className="text-center text-black dark:text-white xxs:text-lg sm:text-2xl md:text-3xl mb-4 font-bold">
          Dashboard
        </p>
        <Dashboard />
      </div>
    </SidebarProvider>
  );
}
