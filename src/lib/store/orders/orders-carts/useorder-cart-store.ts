import { create } from "zustand";
import { addToCart } from "@/hooks/forOrderCartStore/add-to-cart";
import { deleteToCart } from "@/hooks/forOrderCartStore/delete-to-cart";
import { calculateTotal } from "@/utils/calculate-total";
import { handlerBuy } from "@/hooks/forOrderCartStore/handler-buy";
import { holdOrder } from "@/hooks/forOrderCartStore/hold-order";
import { updateOrder } from "@/hooks/forOrderCartStore/update-order";
import {
  CartStoreType,
  CartType,
} from "@/app/types/zustand/orders/use-order-cart-store-type";

export const useOrderCartStore = create<CartStoreType>((set, get) => ({
  cart: [],
  setCart: (ItemCart: CartType[]) => set({ cart: ItemCart }),
  clearCart: () => set({ cart: [] }),
  addToCart: addToCart(get, set),
  triggerRefetch: 0,
  setTriggerRefetch: (num: number) => set({ triggerRefetch: num }),
  holdMode: false,
  setHoldMode: (mode) => set({ holdMode: mode }),
  setHoldOrderNum: (num) => set({ holdOrderNum: num }),
  holdOrderNum: null,
  deleteToCart: deleteToCart(get, set),
  calculateTotal: calculateTotal(get),
  handlerBuy: () => handlerBuy(get),
  holdOrder: () => holdOrder(get),
  updateOrder: (orderNum: number) => updateOrder(orderNum, get),
}));
