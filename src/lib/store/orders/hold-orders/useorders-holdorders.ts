import { create } from "zustand";
import {
  OrderType,
  useOrder_HoldOrderStoreType,
} from "@/app/types/zustand/orders/use-order-holdorder-store-type";

export const useOrder_HoldOrderStore = create<useOrder_HoldOrderStoreType>(
  (set) => ({
    orders: [],
    holdorders: [],
    setOrders: (data: OrderType[]) => set({ orders: data }),
    setHoldOrders: (data: OrderType[]) => set({ holdorders: data }),
  })
);
