"use client";
import Dashboard from "@/components/DashBoard";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/App-sidebar";

export default function Home() {
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
