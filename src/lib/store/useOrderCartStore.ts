import { Product } from "./Product";
import { create } from "zustand";

export interface Cart {
  product: Product;
  quantity: number;
}

interface CartStore {
  cart: Cart[];
  setCart: (data: Cart[]) => void;
  clearCart: () => void;
  addToCart: (product: Product) => void;
  deleteToCart: (Id: string) => void;
  calculateTotal: () => number;
  hanlerBuy: () => Promise<void>;
  holdOrder: () => Promise<void>;
  
}

export const useOrderCartStore = create<CartStore>((set, get) => ({
  cart: [],
  setCart: (data: Cart[]) => set({ cart: data }),
  clearCart: () => set({ cart: [] }),
  addToCart: (product) => {
    const current = get().cart;
    const exists = current.find(
      (item: Cart) => item.product._id === product._id
    ) as Cart;
    if (exists) {
      set({
        cart: current.map((item: Cart) =>
          item.product._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      });
    } else {
      set({ cart: [...current, { product, quantity: 1 }] });
    }
  },
  deleteToCart: (productId: string) => {
    const current = get().cart;
    const exists = current.find(
      (item: Cart) => item.product._id === productId
    ) as Cart;
    if (exists) {
      set({
        cart: current
          .map((item) =>
            item.product._id === productId
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
          .filter((item) => item.quantity > 0),
      });
    } else {
      set({ cart: current });
    }
  },
  calculateTotal: () => {
    const current = get().cart;
    return current.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  },
  hanlerBuy: async () => {
    const cart = get().cart;
    if (cart.length === 0) return alert("Cart is empty!");
    const BASE_API_URL =
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
    const Confirm = confirm(" ยืนยันการขายใช่ไหม ?");
    if (Confirm) {
      try {
        // เตรียมข้อมูล order ที่จะส่งไปยัง API
        const orderData = {
          items: cart.map((item) => ({
            product: item.product.name, // ใช้ name แทน ObjectId
            quantity: item.quantity,
            price: item.product.price,
            category: item.product.category, //
          })),
          status: "paid",
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
        alert("Order placed successfully!");
        get().clearCart();
      } catch (error) {
        console.error(`Buy Fail! Error = `, error);
        alert("Error placing order");
      }
    }
  },
  holdOrder: async () => {
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
  },
}));
