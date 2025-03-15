import { create } from "zustand";

interface IOrder {
  num: number;
  items: {
    product: string;
    quantity: number;
    price: number;
    category: string;
  }[];
  total: number;
  customerCount: number;
  createdAt: string;
}

interface OrderState {
  orders: IOrder[];
  setOrders: (orders: IOrder[]) => void;
}

export const useOrderStore = create<OrderState>((set) => ({
  orders: [], // เริ่มต้นเป็นอาเรย์ว่าง
  setOrders: (orders) => set({ orders }),
}));
