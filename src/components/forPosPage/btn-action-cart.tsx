import React from "react";
import { useOrderCartStore } from "@/lib/store/useorder-cart-store";
const BtnActionCart = () => {
  const {
    clearCart,
    cart,
    calculateTotal,
    handlerBuy,
    holdOrder,
    holdMode,
    holdOrderNum,
    updateOrder,
  } = useOrderCartStore();
  return (
    <>
      {cart.length > 0 && (
        <div className=" flex justify-between mt-10">
          <div className="flex">
            <p className="text-lg font-bold text-black dark:text-slate-200">
              Total: ฿{calculateTotal()}
            </p>
            {/* Buy Cart Button */}
            <button
              onClick={async () => {
                if (holdMode && holdOrderNum !== null) {
                  await updateOrder(holdOrderNum);
                } else {
                  await handlerBuy();
                }
              }}
              className="xxs:ms-1 ms-3 bg-green-600 xxs:text-lg xxs:font-medium  text-white xxs:px-1.5 h-8  px-3 font-bold py-0.5 rounded-md dark:border dark:bordor-white dark:border-solid"
            >
              Buy
            </button>
            {/* Clear Cart Button */}
            <button
              onClick={clearCart}
              className=" bg-red-600 xxs:text-lg xxs:font-medium mx-1.5 text-white xxs:px-1.5 h-8  px-3 font-bold py-0.5 rounded-md dark:border dark:bordor-white dark:border-solid"
            >
              Clear
            </button>
          </div>
          <div>
            <button
              onClick={() => {
                holdOrder();
              }}
              className=" bg-green-600 xxs:text-lg xxs:font-medium  text-white xxs:px-1.5 h-8  px-3 font-bold py-0.5 rounded-md dark:border dark:bordor-white dark:border-solid"
            >
              Hold
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default BtnActionCart;
