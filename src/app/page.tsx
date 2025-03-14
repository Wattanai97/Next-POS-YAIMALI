"use client";
import Dashboard from "@/components/Transaction-Check";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/App-sidebar";

export default function Home() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="text-black my-4 font-bold w-screen">
        <p className="text-center text-white font-bold">Dashboard</p>
        <Dashboard />
      </div>
    </SidebarProvider>
  );
}
