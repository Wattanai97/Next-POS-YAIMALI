import { useState } from "react";
import { Calendar, Home, Inbox, Settings, Menu } from "lucide-react";
import Link from "next/link";
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

// เมนูต่างๆ
const items = [
  { title: "แดชบอร์ด", url: "/", icon: Home },
  { title: "ดูออเดอร์ตามวัน", url: "/report", icon: Inbox },
  { title: "สรุปยอดขายตามวัน", url: "/", icon: Calendar },
  { title: "Settings", url: "/", icon: Settings },
];

export function AppSidebar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      {/* ปุ่มเปิด Sidebar */}
      <button
        className="fixed top-16 left-4 z-[100] p-2 bg-gray-800 text-white rounded-md"
        onClick={() => setIsOpen(true)}
      >
        <Menu size={24} />
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-[90] transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-56 sm:w-72 bg-slate-950 text-white z-[100] shadow-lg transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <SidebarContent className="h-full flex flex-col">
          {/* หัวข้อ Sidebar */}
          <SidebarGroup>
            <SidebarGroupLabel className="p-4 text-lg font-bold mb-6">
              POS Heaun-yai-mali
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link
                        href={item.url}
                        className="flex items-center gap-2 p-3 hover:bg-gray-700 rounded-md transition"
                        onClick={() => setTimeout(() => setIsOpen(false), 200)}
                      >
                        <item.icon size={20} />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </div>
    </>
  );
}
