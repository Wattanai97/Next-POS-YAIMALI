// handler-buy.ts
import { CartStoreType } from "@/app/types/zustand/orders/use-order-cart-store-type";

export const handlerBuy = async (get: () => CartStoreType) => {
  const {
    cart,
    calculateTotal,
    clearCart,
    setTriggerRefetch,
    setHoldOrderNum,
    setHoldMode,
  } = get();

  if (cart.length === 0) return alert("Cart is empty!");

  const BASE_API_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

  try {
    const orderData = {
      items: cart.map((item) => ({
        productId: item.product.productId,
        product: item.product.name,
        quantity: item.quantity,
        price: item.product.price,
        category: item.product.category,
      })),
      status: "paid",
      total: calculateTotal(),
    };

    const res = await fetch(`${BASE_API_URL}/api/orderspay`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderData),
    });

    if (!res.ok) throw new Error("Failed to place order");

    alert("ทำรายการขายสำเร็จ");
    setTriggerRefetch(Date.now());
    setHoldOrderNum(null);
    setHoldMode(false);
    clearCart();
  } catch (error) {
    console.error(error);
    alert("Error placing order");
  }
};
