import { CartStore } from "@/lib/store/useorder-cart-store";

export const calculateTotal = (get: () => CartStore) => () => {
  const current = get().cart;
  return current.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );
};
