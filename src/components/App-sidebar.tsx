import { useState, useEffect } from "react";
import { Calendar, Home, Inbox, Settings } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

// Menu items.
const items = [
  {
    title: "แดชบอร์ด",
    url: "/",
    icon: Home,
  },
  {
    title: "ดูออเดอร์ตามวัน",
    url: "/api/fetchorders",
    icon: Inbox,
  },
  {
    title: "สรุปยอดขายตามวัน",
    url: "/",
    icon: Calendar,
  },
  {
    title: "Settings",
    url: "/",
    icon: Settings,
  },
];

export function AppSidebar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // ฟังก์ชันเปิด/ปิด Sidebar

  return (
    <>
      <div>
        {/* ปุ่มเปิด Sidebar */}
        <button onClick={() => setIsOpen((prev) => !prev)}>
          {""}
        </button>
        {!isOpen && (
          <div>
            <Sidebar id="sidebar">
              <SidebarContent>
                <SidebarGroup>
                  <SidebarGroupLabel>POS Heaun-yai-mali</SidebarGroupLabel>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {items.map((item) => (
                        <SidebarMenuItem key={item.title}>
                          <SidebarMenuButton
                            asChild
                            onClick={() => setIsOpen((prev) => !prev)} // ปิด Sidebar เมื่อคลิกที่เมนู
                          >
                            <a href={item.url}>
                              <item.icon />
                              <span>{item.title}</span>
                            </a>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              </SidebarContent>
            </Sidebar>
          </div>
        )}
      </div>
    </>
  );
}
