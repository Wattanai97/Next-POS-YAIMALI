import { ProductType } from "../../product-type";

export interface CartType {
  product: ProductType;
  quantity: number;
}

export interface CartStoreType {
  cart: CartType[];
  setCart: (ItemCart: CartType[]) => void;
  clearCart: () => void;
  triggerRefetch: number;
  setTriggerRefetch: (data: number) => void;
  holdMode: boolean;
  setHoldMode: (mode: boolean) => void;
  holdOrderNum: number | null;
  setHoldOrderNum: (num: number | null) => void;
  // holdOrderDbNum: number | null;
  // setHoldOrderDbNum: (num: number) => void;
  addToCart: (product: ProductType) => void;
  deleteToCart: (Id: string) => void;
  calculateTotal: () => number;
  handlerBuy: () => Promise<void>;
  holdOrder: (orderNum: number | null) => Promise<void>;
  updateOrder: (orderNum: number) => Promise<void>;
}
