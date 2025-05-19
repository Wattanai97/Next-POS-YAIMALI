"use client";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { DialogTitle, DialogDescription } from "@/components/ui/dialog"; // ✅ Import DialogTitle, DialogDescription
import { ThemeToggle } from "../theme/theme-toggle";
import { useLoadingStore } from "@/lib/store/useloding-errormessage";

export default function Navbar() {
  const { setIsAuthLoading, isAuthLoading, isLoading } = useLoadingStore();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false); // ✅ State สำหรับเปิด/ปิด Sidebar
  const { data: session } = useSession();
  // ✅ ปิด Sidebar เมื่อเปลี่ยนหน้า
  const handleClose = () => setIsOpen(false);

  const handlerSingout = async () => {
    setIsAuthLoading(false);
    try {
      await signOut({ callbackUrl: "/auth/login" });
      alert("Logout สำเร็จ");
    } catch (error) {
      if (error instanceof Error) {
        console.log(`Error Message = ${error.message}`);
      }
    } finally {
      setIsAuthLoading(true);
    }
  };

  if (isAuthLoading)
    return (
      <p className="text-center mt-20 font-bold animate-bounce text-slate-950 dark:text-slate-100/80 text-3xl">
        Loading...
      </p>
    );
  if (isLoading) return <div></div>;

  return (
    <nav className="bg-blue-300/70 dark:bg-slate-800 dark:bg-opacity-30 text-black backdrop-blur-none dark:text-white py-3 px-6 flex justify-between items-center mb-2 relative">
      {/* Left Side */}
      <div className="text-xl font-bold flex">
        <button
          onClick={() => {
            router.push("/pos");
          }}
          className="btn-navbar button-navbar mx-2 absolute left-16 bottom-3.5"
        >
          <Link className="italic" href="/pos">
            {" "}
            POS
          </Link>
        </button>
        <ThemeToggle />
      </div>

      {/* Right Side - Desktop */}
      <div className="hidden md:flex items-center gap-4">
        {!session?.user?.username ? (
          <>
            <button disabled className="button-navbar btn-navbar mb-2.5 top-0">
              <Link href="/auth/register">สมัครสมาชิก</Link>
            </button>
            <button className="button-navbar btn-navbar mb-2.5 top-0">
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
              className="button-navbar btn-navbar mb-2.5 top-0"
              onClick={() => router.push(`/notes`)}
            >
              Notes
            </button>
            <button
              className="button-navbar btn-navbar mb-2.5 top-0"
              onClick={() => router.push(`/`)}
            >
              Dashboard
            </button>
            <button
              className="button-navbar btn-navbar mb-2.5 top-0"
              onClick={handlerSingout}
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
                className="button-navbar btn-navbar my-1.5"
                onClick={handleClose}
              >
                <Link href="/auth/register">สมัครสมาชิก</Link>
              </button>
              <button
                className="button-navbar btn-navbar my-1.5"
                onClick={handleClose}
              >
                <Link href="/auth/login">เข้าสู่ระบบ</Link>
              </button>
            </>
          ) : (
            <>
              <span className="text-lg">ยินดีต้อนรับ</span>
              <button
                className="button-navbar btn-navbar my-1.5"
                onClick={() => {
                  router.push(`/notes`);
                  handleClose();
                }}
              >
                Notes
              </button>
              <button
                className="button-navbar btn-navbar my-1.5"
                onClick={() => {
                  router.push(`/`);
                  handleClose();
                }}
              >
                Dashboard
              </button>
              <button
                className="button-navbar btn-navbar my-1.5"
                onClick={handlerSingout}
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
