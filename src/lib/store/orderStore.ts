import { create } from "zustand";

export interface IOrder {
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
  setOrders: (data: IOrder[]) => void;
}

export const useOrderStore = create<OrderState>((set) => ({
  orders: [],
  setOrders: (data: IOrder[]) => set({ orders: data }),
}));
