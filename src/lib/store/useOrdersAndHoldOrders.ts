import { create } from "zustand";
import { statusType } from "@/models/order";
export interface IOrder {
  num: number;
  items: {
    productId: string;
    product: string;
    quantity: number;
    price: number;
    category: string;
  }[];
  status: statusType;
  total: number;
  customerCount: number;
  createdAt: string;
}

interface OrderState {
  orders: IOrder[];
  holdorders: IOrder[];
  setOrders: (data: IOrder[]) => void;
  setHoldOrders: (data: IOrder[]) => void;
}

export const useOrderStore = create<OrderState>((set) => ({
  orders: [],
  holdorders: [],
  setOrders: (data: IOrder[]) => set({ orders: data }),
  setHoldOrders: (data: IOrder[]) => set({ holdorders: data }),
}));
