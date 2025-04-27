"use client";
import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
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
  useEffect(() => {
    router.push("/auth/login");
  }, [session?.user.username]);
  return (
    <nav className="bg-slate-400/30 dark:bg-slate-800 dark:bg-opacity-30 text-black backdrop-blur-none dark:text-white py-3 px-6 flex justify-between items-center mb-2 ">
      {/* Left Side */}
      <div className="text-xl font-bold flex">
        <Link className="me-4 mt-1" href="/pos">
          POS
        </Link>
        <ThemeToggle />
      </div>

      {/* Right Side - Desktop */}
      <div className="hidden md:flex items-center gap-4">
        {!session?.user?.username ? (
          <>
            <button
              disabled
              className=" dark:bg-black/50 text-white dark:text-green-400 px-3 py-1 rounded-lg bg-sky-600 hover:scale-110 duration-300"
            >
              <Link href="/auth/register">สมัครสมาชิก</Link>
            </button>
            <button className=" dark:bg-black/50 text-white dark:text-green-400 px-3 py-1 rounded-lg bg-violet-600 hover:scale-110 duration-300">
              <Link href="/auth/login">เข้าสู่ระบบ</Link>
            </button>
          </>
        ) : (
          <>
            <div className="flex">
              <span className="hidden md:inline mx-1">Hi :</span>
              <p className="text-center">User {session.user.username}</p>
              <span className="mx-3">Role :</span>
              <span>{session.user.role}</span>
            </div>
            <button
              className="dark:bg-black/50 text-white dark:text-green-400 px-3 py-1 rounded-lg bg-sky-600 hover:scale-110 duration-300"
              onClick={() => router.push(`/`)}
            >
              Dashboard
            </button>
            <button
              className="dark:bg-black/50 text-white dark:text-green-400 px-3 py-1 rounded-lg bg-violet-600 hover:scale-110 duration-300"
              onClick={async () => {
                await signOut({ redirect: false });
                router.push("/auth/login"); // ✅ Logout แล้วไปที่หน้า login ทันที
                alert("Logout สำเร็จ");
              }}
            >
              ออกจากระบบ
            </button>
          </>
        )}
      </div>

      {/* Mobile Menu */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <button className="md:hidden">
            <Menu className="w-6 h-6" />
          </button>
        </SheetTrigger>

        <SheetContent side="right" className="flex flex-col gap-4 mt-0.5 p-4">
          {/* ✅ แก้ Warning ด้วย DialogTitle & DialogDescription */}
          <DialogTitle className="sr-only">เมนูนำทาง</DialogTitle>
          <DialogDescription className="sr-only">
            ใช้เมนูนี้เพื่อนำทางไปยังหน้าอื่น
          </DialogDescription>

          {!session?.user.username ? (
            <>
              <button
                className="mt-8 text-slate-950 bg-slate-300 dark:bg-black dark:text-slate-300"
                onClick={handleClose}
              >
                <Link href="/auth/register">สมัครสมาชิก</Link>
              </button>
              <button
                className="text-slate-950 bg-slate-300 dark:bg-black dark:text-slate-300"
                onClick={handleClose}
              >
                <Link href="/auth/login">เข้าสู่ระบบ</Link>
              </button>
            </>
          ) : (
            <>
              <span className="text-lg">ยินดีต้อนรับ</span>
              <button
                className="text-slate-950 bg-slate-300 dark:bg-black dark:text-slate-300 hover:bg-gray-600"
                onClick={() => {
                  router.push(`/`);
                  handleClose();
                }}
              >
                Dashboard
              </button>
              <button
                className="text-slate-950 bg-slate-300 dark:bg-black dark:text-slate-300"
                onClick={async () => {
                  await signOut({ redirect: false });
                  router.replace("/auth/login"); // ✅ Logout แล้วไปที่หน้า login ทันที
                  handleClose();
                }}
              >
                ออกจากระบบ
              </button>
            </>
          )}
        </SheetContent>
      </Sheet>
    </nav>
  );
}
