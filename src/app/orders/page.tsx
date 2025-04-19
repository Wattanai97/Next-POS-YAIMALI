"use client";
import Selectbuttontype from "@/components/extendorderspage/select-button-type";
import ToTalBuyClearCartButton from "@/components/extendorderspage/total-buy-clear";
import ProductMenu from "@/components/extendorderspage/product-menu";
import CartSection from "@/components/extendorderspage/cart-section";
export default function POSPage() {
  return (
    <div className="px-4">
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
      {/* Container สำหรับ Menu และ Cart */}
      <div className="xxs:flex xxs:flex-col sm:grid sm:grid-cols-2 gap-4 mt-4">
        {/* Menu Section Main Menu Element (เพิ่ม grid-cols-1 md:grid-cols-2) */}
        <ProductMenu />
        {/*  */}
        {/* Cart Section */}
        <div className="flex flex-col min-h-0 max-h-[400px] overflow-auto border-2 border-black dark:border-white rounded-md p-2 ">
          <div className="flex justify-center">
            <span className="text-lg font-semibold text-black dark:text-white xxs:block sm:hidden">
              Cart
            </span>
          </div>
          {/* Cart Section Component */}
          <CartSection />
          {/*  */}
          {/* Button And Total Price Element */}
          <ToTalBuyClearCartButton />
          {/*  */}
        </div>
      </div>
    </div>
  );
}
