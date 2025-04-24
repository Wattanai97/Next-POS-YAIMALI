import { Cart, CartStore } from "@/lib/store/use-order-cartstore";

export const deleteToCart =
  (get: () => CartStore, set: any) => (productId: string) => {
    const current = get().cart;
    const exists = current.find(
      (item: Cart) => item.product.productId === productId
    ) as Cart;
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
