import React from "react";
import { useOrderCartStore } from "@/lib/store/orders/orders-carts/useorder-cart-store";
import { Card, CardContent } from "@/components/ui/card";
const CartSection = () => {
  const { cart, deleteToCart, addToCart } = useOrderCartStore();
  return (
    <>
      {cart.map((item) => (
        <Card
          key={item.product.productId.toString()}
          className="p-0.5 mx-4 my-1 border border-solid border-black dark:border-white relative"
        >
          <CardContent>
            <h3>{item.product.name}</h3>
            <p>
              {item.quantity} x ฿{item.product.price}
            </p>
            {/* Btn Add Product and Delete Product *1 Quantity */}
            <div className="ForBtn-Add-Del-To-Cart absolute right-1 bottom-3">
              <button
                onClick={() => addToCart(item.product)}
                className="delete-button mx-1.5 hover:scale-125"
              >
                +
              </button>
              <button
                onClick={() => deleteToCart(item.product.productId.toString())}
                className="delete-button mx-1.5 hover:scale-125"
              >
                -
              </button>
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
};

export default CartSection;
