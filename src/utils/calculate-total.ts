import { CartStoreType } from "@/app/types/zustand/orders/use-order-cart-store-type";

export const calculateTotal = (get: () => CartStoreType) => () => {
  const current = get().cart;
  return current.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );
};
