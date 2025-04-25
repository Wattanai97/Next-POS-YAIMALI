import React from "react";
import { useOrderCartStore } from "@/lib/store/useorder-cart-store";
import { Card, CardContent } from "@/components/ui/card";
const CartSection = () => {
  const { cart, deleteToCart } = useOrderCartStore();
  return (
    <>
      {cart.map((item) => (
        <Card
          key={item.product.productId.toString()}
          className="p-0.5 mx-4 my-0.5 border border-solid border-black dark:border-white"
        >
          <CardContent>
            <h3>{item.product.name}</h3>
            <div className="flex justify-between mb-2">
              <p>
                {item.quantity} x ฿{item.product.price}
              </p>
              <button
                onClick={() => deleteToCart(item.product.productId.toString())}
                className="delete-button"
              >
                ลบ
              </button>
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
};

export default CartSection;
