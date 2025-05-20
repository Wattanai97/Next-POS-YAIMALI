import {
  CartType,
  CartStoreType,
} from "@/app/types/zustand/orders/use-order-cart-store-type";

export const deleteToCart =
  (get: () => CartStoreType, set: ({}) => void) => (productId: string) => {
    const current = get().cart;
    const exists = current.find(
      (item: CartType) => item.product.productId === productId
    ) as CartType;
    if (exists) {
      set({
        cart: current
          .map((item) =>
            item.product.productId === productId
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
          .filter((item) => item.quantity > 0),
      });
    } else {
      set({ cart: current });
    }
  };
