"use client";
import Dashboard from "@/components/Transaction-Check";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/App-sidebar";




export default function Home() {
 
  return (
    <div>
      <SidebarProvider>
        <AppSidebar />
        <SidebarTrigger />

        <div className="text-black my-4 font-bold w-screen">
          <p className="text-center font-bold">HelloDashboard</p>
          <Dashboard/>
        </div>
      </SidebarProvider>
    </div>
  );
}
