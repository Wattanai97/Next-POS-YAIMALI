import { CartStore } from "../useOrderCartStore";
export const holdOrder = async (get: () => CartStore) => {
  const cart = get().cart;
  if (cart.length === 0) return alert("Cart is empty!");
  const BASE_API_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
  const Confirm = confirm(" ยืนยันการพักออเดอร์ไว้ใช่ไหม ?");
  if (Confirm) {
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
        status: "hold",
        total: get().calculateTotal(), // คำนวณยอดรวม
      };
      // ส่งข้อมูลไปที่ API
      const res = await fetch(`${BASE_API_URL}/api/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });
      // ถ้า API ส่งกลับว่าไม่โอเค ให้แสดงข้อผิดพลาด
      if (!res.ok) throw new Error("Failed to place order");
      alert("Order Holder successfully!");
      get().clearCart();
    } catch (error) {
      console.error(`Hold Fail! Error = `, error);
      alert("Error placing order");
    }
  }
};
