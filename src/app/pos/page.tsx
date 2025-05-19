"use client";
import { useEffect } from "react";
import BtnFilterMenuByType from "@/components/pos/btn-filtermenu-bytype";
import BtnActionCart from "@/components/pos/btn-action-cart";
import ProductMenu from "@/components/pos/product-menu";
import CartSection from "@/components/pos/cart-section";
import MainwindowHoldOrders from "@/components/pos/hold-orders/flying-window-hold-orders";
import useFetchHoldOrders from "@/hooks/fetchdata/use-fetch-hold-orders";
import LoadingSpinner from "@/components/loading-error/loading-spiner";
import ErrorMessage from "@/components/loading-error/error-message";
import { useHoldOrderStore } from "@/lib/store/orders/hold-orders/useanimate-hold-orders-window";
import { useOrderCartStore } from "@/lib/store/orders/useorder-cart-store";
import FetchOrders from "@/hooks/fetchdata/use-fetch-orders";
import { useLoadingStore } from "@/lib/store/useloding-errormessage";
import { redirect, usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import AuthLoading from "@/components/loading-error/auth-loading";

export default function POSPage() {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const { error, isLoading, isAuthLoading } = useLoadingStore();
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
    if (status === "unauthenticated" && pathname === "/pos") {
      redirect("/auth/login");
    }
  }, [pathname, status, session?.user.username]);
  useEffect(() => {
    fetchHoldOrders();
  }, []);
  if (isLoading) return <LoadingSpinner />;
  if (isAuthLoading) return <AuthLoading />;
  if (error) return <ErrorMessage error={error} />;
  return (
    <div className="px-4 relative inset-0">
      {/* ปุ่มดูออเดอร์พัก  HoldOrders */}
      <div className="flex justify-center xxs:top-4 my-2 xxs:right-5 sm:right-6 sm:top-0 absolute z-20">
        <button
          onClick={isVisible ? closeHold : openHold}
          className="btn-navbar button-navbar"
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
          {/* HoldOrders SlideWindow Component */}
          <MainwindowHoldOrders />
        </div>
      )}

      {/* Filter Product Menu ByType Button Component */}
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
        {/* Product-Menu Component*/}
        <ProductMenu />
        <div className="flex flex-col min-h-0 max-h-[400px] overflow-auto border-2 border-black dark:border-white rounded-md p-2">
          <div className="flex justify-center">
            <span className="text-lg font-semibold text-black dark:text-white xxs:block sm:hidden">
              Cart
            </span>
          </div>
          {/* CartSection-Component && BtnActionCart-Component */}
          <CartSection />
          <BtnActionCart />
        </div>
      </div>
    </div>
  );
}
