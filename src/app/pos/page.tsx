"use client";
import { useEffect } from "react";
import BtnFilterMenuByType from "@/components/forPosPage/btn-filtermenu-bytype";
import BtnActionCart from "@/components/forPosPage/btn-action-cart";
import ProductMenu from "@/components/forPosPage/product-menu";
import CartSection from "@/components/forPosPage/cart-section";
import MainwindowHoldOrders from "@/components/forPosPage/holdOrders/flying-window-hold-orders";
import useFetchHoldOrders from "@/hooks/use-fetch-hold-orders";
import LoadingSpinner from "@/components/loading-spiner";
import ErrorMessage from "@/components/error-message";
import { useHoldOrderStore } from "@/lib/store/useanimate-hold-orders-window";
import { useOrderCartStore } from "@/lib/store/useorder-cart-store";
import FetchOrders from "@/hooks/use-fetch-orders";
import { useLoadingStore } from "@/lib/store/useloding-errormessage";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
export default function POSPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const { error, isLoading } = useLoadingStore();
  const { fetchHoldOrders } = useFetchHoldOrders();
  const { fetchOrders } = FetchOrders();
  const { closeHold, openHold, isVisible, isAnimatingOut, finishAnimation } =
    useHoldOrderStore();
  const { triggerRefetch } = useOrderCartStore();
  useEffect(() => {
    if (!triggerRefetch) return;
    fetchOrders();
    fetchHoldOrders();
  }, [triggerRefetch]);
  useEffect(() => {
    if (!session?.user.username) {
      router.push("/auth/login");
    }
  }, [session?.user.username]);
  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;
  return (
    <div className="px-4 relative inset-0">
      {/* ปุ่มดูออเดอร์พัก  HoldOrders */}
      <div className="flex justify-center xxs:my-3 my-2 xxs:right-3 sm:right-6 xxs:top-5 sm:top-0 absolute z-20">
        <button
          onClick={isVisible ? closeHold : openHold}
          className="bg-violet-700 text-white xxs:px-0.5 xxs:py-0.5 sm:px-3 sm:py-1 rounded-md hover:scale-105 transition"
        >
          ดูออเดอร์ที่พักไว้
        </button>
      </div>

      {/* Hold Order Panel */}
      {isVisible && (
        <div
          className={`bg-slate-950/100 rounded-lg absolute w-full h-screen left-0 z-10
          ${isAnimatingOut ? "animate-slideOutRight" : "animate-slideInRight"}`}
          onAnimationEnd={finishAnimation}
        >
          {/* HoldOrders Component */}
          <MainwindowHoldOrders />
        </div>
      )}

      {/* FilterType Button */}
      <BtnFilterMenuByType />

      {/* Menu and Cart */}
      <div className="flex justify-around me-6 relative xxs:mb-10">
        <span className="mx-3 text-lg font-semibold text-black xxs:absolute xxs:top-1 xxs:left-0 dark:text-white">
          Menu
        </span>
        <span className="text-lg sm:ms-20 font-semibold text-black dark:text-white xxs:hidden sm:block">
          Cart
        </span>
      </div>

      <div className="xxs:flex xxs:flex-col sm:grid sm:grid-cols-2 gap-4 mt-4 relative">
        {/* Product-Menu */}
        <ProductMenu />
        <div className="flex flex-col min-h-0 max-h-[400px] overflow-auto border-2 border-black dark:border-white rounded-md p-2">
          <div className="flex justify-center">
            <span className="text-lg font-semibold text-black dark:text-white xxs:block sm:hidden">
              Cart
            </span>
          </div>
          {/* ตะกร้าสินค้า */}
          <CartSection />
          {/* ปุ่มควบคุมการพัก - ซื้อขาย ออเดอร์ */}
          <BtnActionCart />
        </div>
      </div>
    </div>
  );
}
