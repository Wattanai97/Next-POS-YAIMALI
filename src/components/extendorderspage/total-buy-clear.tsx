import React from "react";
import { useOrderCartStore } from "@/lib/store/useOrderCartStore";
const ToTalBuyClearCartButton = () => {
  const { clearCart, cart, calculateTotal, hanlerBuy, holdOrder } =
    useOrderCartStore();
  return (
    <>
      {cart.length > 0 && (
        <div className="m-2.5 flex justify-between mt-10">
          <div className="flex">
            <p className="text-lg font-bold text-black dark:text-slate-200">
              Total: ฿{calculateTotal()}
            </p>
            {/* Buy Cart Button */}
            <button
              onClick={() => {
                hanlerBuy();
              }}
              className="bg-green-600 mx-2 text-white  px-3 font-bold py-0.5 rounded-md dark:border dark:bordor-white dark:border-solid"
            >
              Buy
            </button>
            {/* Clear Cart Button */}
            <button
              onClick={clearCart}
              className="bg-red-600 text-white  px-3 font-bold py-0.5 rounded-md dark:border dark:bordor-white dark:border-solid"
            >
              Clear
            </button>
          </div>
          <div>
            <button
              onClick={() => {
                holdOrder();
              }}
              className="bg-green-600 mx-2 text-white  px-3 font-bold py-0.5 rounded-md dark:border dark:bordor-white dark:border-solid"
            >
              Hold
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ToTalBuyClearCartButton;
