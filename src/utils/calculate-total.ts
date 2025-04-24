import { CartStore } from "@/lib/store/use-order-cartstore";

export const calculateTotal = (get: () => CartStore) => () => {
  const current = get().cart;
  return current.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );
};
