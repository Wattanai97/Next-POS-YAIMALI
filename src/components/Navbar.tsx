"use client";

import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { DialogTitle, DialogDescription } from "@/components/ui/dialog"; // ✅ Import DialogTitle, DialogDescription
import { ThemeToggle } from "./theme-toggle";

export default function Navbar() {
  const { data: session } = useSession();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false); // ✅ State สำหรับเปิด/ปิด Sidebar

  // ✅ ปิด Sidebar เมื่อเปลี่ยนหน้า
  const handleClose = () => setIsOpen(false);

  return (
    <nav className="bg-slate-400 dark:bg-slate-800 text-black bg-opacity-100 backdrop-blur-none dark:text-white py-3 px-6 flex justify-between items-center mb-2 ">
      {/* Left Side */}
      <div className="text-xl font-bold">
        <Link className="me-4" href="/orders">
          POS System
        </Link>
        <ThemeToggle />
      </div>

      {/* Right Side - Desktop */}
      <div className="hidden md:flex items-center gap-4">
        {!session?.user?.username ? (
          <>
            <Button
              asChild
              variant="outline"
              className="text-slate-950 bg-slate-300 dark:bg-black dark:text-slate-300 "
            >
              <Link href="/auth/register">สมัครสมาชิก</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="text-slate-950 bg-slate-300 dark:bg-black dark:text-slate-300 "
            >
              <Link href="/auth/login">เข้าสู่ระบบ</Link>
            </Button>
          </>
        ) : (
          <>
            <div className="flex">
              <span className="hidden md:inline mx-1">Hi :</span>
              <p className="text-center">User {session.user.username}</p>
              <span className="mx-3">Role :</span>
              <span>{session.user.role}</span>
            </div>
            <Button
              variant="default"
              className="text-slate-950 bg-slate-300 dark:bg-black dark:text-slate-300 hover:bg-gray-600"
              onClick={() => router.push(`/`)}
            >
              Dashboard
            </Button>
            <Button
              variant="destructive"
              className="text-slate-950 bg-slate-300 dark:bg-black dark:text-slate-300"
              onClick={async () => {
                await signOut({ redirect: false });
                router.replace("/auth/login"); // ✅ Logout แล้วไปที่หน้า login ทันที
              }}
            >
              ออกจากระบบ
            </Button>
          </>
        )}
      </div>

      {/* Mobile Menu */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" className="md:hidden">
            <Menu className="w-6 h-6" />
          </Button>
        </SheetTrigger>

        <SheetContent side="right" className="flex flex-col gap-4 mt-0.5 p-4">
          {/* ✅ แก้ Warning ด้วย DialogTitle & DialogDescription */}
          <DialogTitle className="sr-only">เมนูนำทาง</DialogTitle>
          <DialogDescription className="sr-only">
            ใช้เมนูนี้เพื่อนำทางไปยังหน้าอื่น
          </DialogDescription>

          {!session?.user.username ? (
            <>
              <Button
                asChild
                variant="outline"
                className="mt-8 text-slate-950 bg-slate-300 dark:bg-black dark:text-slate-300"
                onClick={handleClose}
              >
                <Link href="/auth/register">สมัครสมาชิก</Link>
              </Button>
              <Button
                className="text-slate-950 bg-slate-300 dark:bg-black dark:text-slate-300"
                asChild
                onClick={handleClose}
              >
                <Link href="/auth/login">เข้าสู่ระบบ</Link>
              </Button>
            </>
          ) : (
            <>
              <span className="text-lg">ยินดีต้อนรับ</span>
              <Button
                variant="default"
                className="text-slate-950 bg-slate-300 dark:bg-black dark:text-slate-300 hover:bg-gray-600"
                onClick={() => {
                  router.push(`/`);
                  handleClose();
                }}
              >
                Dashboard
              </Button>
              <Button
                variant="destructive"
                className="text-slate-950 bg-slate-300 dark:bg-black dark:text-slate-300"
                onClick={async () => {
                  await signOut({ redirect: false });
                  router.replace("/auth/login"); // ✅ Logout แล้วไปที่หน้า login ทันที
                  handleClose();
                }}
              >
                ออกจากระบบ
              </Button>
            </>
          )}
        </SheetContent>
      </Sheet>
    </nav>
  );
}
