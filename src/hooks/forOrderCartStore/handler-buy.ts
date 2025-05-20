import { CartStoreType } from "@/app/types/zustand/orders/use-order-cart-store-type";
export const handlerBuy = async (get: () => CartStoreType) => {
  const cart = get().cart;
  const setHoldmode = get().setHoldMode;
  const setHoldordernum = get().setHoldOrderNum;
  const setTriggleRefetch = get().setTriggerRefetch;
  if (cart.length === 0) return alert("Cart is empty!");
  const BASE_API_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
  try {
    // เตรียมข้อมูล order ที่จะส่งไปยัง API
    const orderData = {
      items: cart.map((item) => ({
        productId: item.product.productId,
        product: item.product.name, // ใช้ name แทน ObjectId
        quantity: item.quantity,
        price: item.product.price,
        category: item.product.category, //
      })),
      status: "paid",
      total: get().calculateTotal(), // คำนวณยอดรวม
    };
    // ส่งข้อมูลไปที่ API
    const res = await fetch(`${BASE_API_URL}/api/orderspay`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderData),
    });
    // ถ้า API ส่งกลับว่าไม่โอเค ให้แสดงข้อผิดพลาด
    if (!res.ok) throw new Error("Failed to place order");
    alert("ทำรายการขายสำเร็จ");
    setTriggleRefetch(Date.now());
    setHoldordernum(null);
    setHoldmode(false);
    get().clearCart();
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      alert("Error placing order");
    }
  }
};
