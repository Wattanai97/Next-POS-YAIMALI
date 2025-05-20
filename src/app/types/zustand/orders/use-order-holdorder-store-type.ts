import { statusType } from "@/models/order";

export interface OrderType {
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

export interface useOrder_HoldOrderStoreType {
  orders: OrderType[];
  holdorders: OrderType[];
  setOrders: (data: OrderType[]) => void;
  setHoldOrders: (data: OrderType[]) => void;
}

export type HoldOrderStoreFlyinWindowType = {
  isVisible: boolean;
  isAnimatingOut: boolean;
  openHold: () => void;
  closeHold: () => void;
  finishAnimation: () => void;
};
