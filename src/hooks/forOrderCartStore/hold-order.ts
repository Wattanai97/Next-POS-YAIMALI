import { CartStoreType } from "@/app/types/zustand/orders/use-order-cart-store-type";
export const holdOrder = async (get: () => CartStoreType, Ordernum: number | null) => {
  const { setHoldMode, setHoldOrderNum, cart, setTriggerRefetch } = get();
  if (cart.length === 0) return alert("Cart is empty!");
  const BASE_API_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

  const orderData = {
    num: Ordernum || undefined,
    items: cart.map((item) => ({
      productId: item.product.productId,
      product: item.product.name, // ใช้ name แทน ObjectId
      quantity: item.quantity,
      price: item.product.price,
      category: item.product.category, //
    })),
    status: "hold",
    total: get().calculateTotal(), // คำนวณยอดรวม
  };

  try {
    let res;
    if (!Ordernum ) {
      res = await fetch(`${BASE_API_URL}/api/orderspay`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });
      if (!res.ok) throw new Error("Failed to place order");
      const response = await res.json();
      // ถ้า API ส่งกลับว่าไม่โอเค ให้แสดงข้อผิดพลาด
      alert("พักออเดอร์สำเร็จ");
      setTriggerRefetch(Date.now());
      setHoldMode(true);
      setHoldOrderNum(response.num);
      get().clearCart();
    } else {
      res = await fetch(`${BASE_API_URL}/api/orderspay/holdorders`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });
      if (!res.ok) throw new Error("Failed to place order");
      const response = await res.json();
      // ถ้า API ส่งกลับว่าไม่โอเค ให้แสดงข้อผิดพลาด
      alert("พักออเดอร์สำเร็จ");
      setTriggerRefetch(Date.now());
      setHoldMode(true);
      setHoldOrderNum(response.num);
      get().clearCart();
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      alert("Error placing Hold order");
    }
  }
};
