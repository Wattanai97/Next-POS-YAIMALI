import { CartStore } from "@/lib/store/useorder-cart-store";
export const updateOrder = async (orderNum: number, get: () => CartStore) => {
  const cart = get().cart;
  const setTriggleRefetch = get().setTriggerRefetch;
  if (cart.length === 0) return alert("Cart is empty!");
  const BASE_API_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
  const Confirm = confirm("ยืนยันการจ่ายเงินและอัปเดตออเดอร์ใช่ไหม?");
  if (Confirm) {
    try {
      const updatedData = {
        num: orderNum,
        items: cart.map((item) => ({
          product: item.product.name,
          quantity: item.quantity,
          price: item.product.price,
          category: item.product.category,
        })),
        total: get().calculateTotal(),
      };

      const res = await fetch(`${BASE_API_URL}/api/orderspay/updateorderspay`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      if (!res.ok) throw new Error("Failed to update order");
      setTriggleRefetch(Date.now());
      alert("อัปเดตออเดอร์และจ่ายเงินสำเร็จ!");
      get().clearCart();
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        alert("Error Updating order");
      }
    }
  }
};
