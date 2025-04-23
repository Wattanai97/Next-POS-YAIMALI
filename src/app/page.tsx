"use client";
import Dashboard from "@/components/DashBoard";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/App-sidebar";
import FetchOrders from "@/components/FetchOrders";
import { useEffect } from "react";
import LoadingSpinner from "@/components/LoadingSpiner";
import ErrorMessage from "@/components/ErrorMessage";
export default function Home() {
  const { fetchOrders, error, loading } = FetchOrders();
  useEffect(() => {
    fetchOrders();
  }, []);
  if (loading) return <LoadingSpinner />;
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
