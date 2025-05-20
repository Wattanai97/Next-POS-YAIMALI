import React from "react";
import { useOrderCartStore } from "@/lib/store/orders/orders-carts/useorder-cart-store";
import { useLoadingStore } from "@/lib/store/useloding-errormessage";
import LoadingSpinner from "../loading-error/loading-spiner";
import { useConfirmStore } from "@/lib/store/dialog/confirm-store";
import BtnPaynow from "./btn-paynow";
const BtnActionCart = () => {
  const { setIsLoading, isLoading } = useLoadingStore();
  const { open } = useConfirmStore();
  const { clearCart, cart, calculateTotal, holdOrder } = useOrderCartStore();
  if (isLoading) return <LoadingSpinner />;
  return (
    <>
      {cart.length > 0 && (
        <div className=" flex gap-2 w-full mt-10">
          <p className="text-lg font-bold text-black flex-1 dark:text-slate-200">
            Total: ฿{calculateTotal()}
          </p>

          {/* Clear Cart Button */}
          <button
            onClick={clearCart}
            className=" btn flex-1 xxs:text-lg xxs:font-medium"
          >
            <strong>Clear</strong>
            <div id="container-stars">
              <div id="stars"></div>
            </div>

            <div id="glow">
              <div className="circle"></div>
              <div className="circle"></div>
            </div>
          </button>

          <button
            onClick={() => {
              open("ยืนยันการพักออเดอร์ไหม ?", () => {
                setIsLoading(false);
                holdOrder();
              });
            }}
            className=" btn flex-1 xxs:text-lg xxs:font-medium"
          >
            <strong>Hold</strong>
            <div id="container-stars">
              <div id="stars"></div>
            </div>

            <div id="glow">
              <div className="circle"></div>
              <div className="circle"></div>
            </div>
          </button>
          {/* Pay And update Cart Button */}
          <div className="xxs:text-lg xxs:font-medium flex-1 text-white ">
            <BtnPaynow />
          </div>
        </div>
      )}
    </>
  );
};

export default BtnActionCart;
