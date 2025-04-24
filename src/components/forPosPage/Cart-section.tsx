import React from "react";
import { useOrderCartStore } from "@/lib/store/use-order-cartstore";
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
            <div className="flex justify-between">
              <p>
                {item.quantity} x ฿{item.product.price}
              </p>
              <button
                className="bg-black text-white px-2 mx-0.5 rounded-md mb-0.5"
                onClick={() => deleteToCart(item.product.productId.toString())}
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
