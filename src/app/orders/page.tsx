"use client";
import { useEffect } from "react";
import Selectbuttontype from "@/components/extendorderspage/select-button-type";
import ToTalBuyClearCartButton from "@/components/extendorderspage/total-buy-clear";
import ProductMenu from "@/components/extendorderspage/product-menu";
import CartSection from "@/components/extendorderspage/cart-section";
import HoldOrders from "@/components/HoldOrders";
import useFetchHoldOrders from "@/components/FetchHoldOrders";
import { useOrderStore } from "@/lib/store/orderStore";
import LoadingSpinner from "@/components/LoadingSpiner";
import ErrorMessage from "@/components/ErrorMessage";
import { useHoldOrderStore } from "@/lib/store/useHoldOrderStore";
export default function POSPage() {
  const { error, fetchHoldOrders, loading } = useFetchHoldOrders();
  const { orders } = useOrderStore();
  const { closeHold, openHold, isVisible, isAnimatingOut, finishAnimation } =
    useHoldOrderStore();
  useEffect(() => {
    if (orders.length > 0) {
      fetchHoldOrders();
    }
  }, [orders]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <div className="px-4 relative inset-0">
      {/* ปุ่มดูออเดอร์พัก */}
      <div className="flex justify-center my-2 right-6 top-0 absolute z-20">
        <button
          onClick={isVisible ? closeHold : openHold}
          className="bg-violet-700 text-white px-3 py-1 rounded-md hover:scale-105 transition"
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
          <HoldOrders/>
        </div>
      )}

      {/* FilterType Button */}
      <Selectbuttontype />

      {/* Menu and Cart */}
      <div className="flex justify-around me-6">
        <span className="mx-3 text-lg font-semibold text-black dark:text-white">
          Menu
        </span>
        <span className="text-lg font-semibold text-black dark:text-white xxs:hidden sm:block">
          Cart
        </span>
      </div>

      <div className="xxs:flex xxs:flex-col sm:grid sm:grid-cols-2 gap-4 mt-4 relative">
        <ProductMenu />
        <div className="flex flex-col min-h-0 max-h-[400px] overflow-auto border-2 border-black dark:border-white rounded-md p-2">
          <div className="flex justify-center">
            <span className="text-lg font-semibold text-black dark:text-white xxs:block sm:hidden">
              Cart
            </span>
          </div>
          <CartSection />
          <ToTalBuyClearCartButton />
        </div>
      </div>
    </div>
  );
}
