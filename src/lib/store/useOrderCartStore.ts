import { Product } from "./Product";
import { create } from "zustand";
import { addToCart } from "./forOrderCartStore/addToCart";
import { deleteToCart } from "./forOrderCartStore/deleteToCart";
import { calculateTotal } from "./forOrderCartStore/calculateTotal";
import { handlerBuy } from "./forOrderCartStore/handlerBuy";
import { holdOrder } from "./forOrderCartStore/holdOrder";
import { updateOrder } from "./forOrderCartStore/updateOrder";
export interface Cart {
  product: Product;
  quantity: number;
}

export interface CartStore {
  cart: Cart[];
  setCart: (data: Cart[]) => void;
  clearCart: () => void;
  addToCart: (product: Product) => void;
  deleteToCart: (Id: string) => void;
  calculateTotal: () => number;
  hanlerBuy: () => Promise<void>;
  holdOrder: () => Promise<void>;
  updateOrder: (orderNum: number) => Promise<void>;
  holdMode: boolean;
  holdOrderNum: number | null;
  setHoldMode: (mode: boolean) => void;
  setHoldOrderNum: (num: number | null) => void;
}

export const useOrderCartStore = create<CartStore>((set, get) => ({
  cart: [],
  setCart: (data: Cart[]) => set({ cart: data }),
  clearCart: () => set({ cart: [] }),
  addToCart: addToCart(get, set),
  deleteToCart: deleteToCart(get, set),
  calculateTotal: calculateTotal(get),
  hanlerBuy: () => handlerBuy(get),
  holdOrder: () => holdOrder(get),
  updateOrder: (orderNum: number) => updateOrder(orderNum, get),
  holdMode: false,
  holdOrderNum: null,
  setHoldMode: (mode) => set({ holdMode: mode }),
  setHoldOrderNum: (num) => set({ holdOrderNum: num }),
}));
