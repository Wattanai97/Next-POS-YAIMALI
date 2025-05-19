import { Product } from "../product";
import { create } from "zustand";
import { addToCart } from "@/hooks/forOrderCartStore/add-to-cart";
import { deleteToCart } from "@/hooks/forOrderCartStore/delete-to-cart";
import { calculateTotal } from "@/utils/calculate-total";
import { handlerBuy } from "@/hooks/forOrderCartStore/handler-buy";
import { holdOrder } from "@/hooks/forOrderCartStore/hold-order";
import { updateOrder } from "@/hooks/forOrderCartStore/update-order";

export interface Cart {
  product: Product;
  quantity: number;
}

export interface CartStore {
  cart: Cart[];
  setCart: (ItemCart: Cart[]) => void;
  clearCart: () => void;
  triggerRefetch: number;
  setTriggerRefetch: (data: number) => void;
  holdMode: boolean;
  setHoldMode: (mode: boolean) => void;
  holdOrderNum: number | null;
  setHoldOrderNum: (num: number | null) => void;
  addToCart: (product: Product) => void;
  deleteToCart: (Id: string) => void;
  calculateTotal: () => number;
  handlerBuy: () => Promise<void>;
  holdOrder: () => Promise<void>;
  updateOrder: (orderNum: number) => Promise<void>;
}

export const useOrderCartStore = create<CartStore>((set, get) => ({
  cart: [],
  setCart: (ItemCart: Cart[]) => set({ cart: ItemCart }),
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
