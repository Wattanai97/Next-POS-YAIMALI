//useOrderCartStore addToCart Logic
import { CartStore } from "@/lib/store/useorder-cart-store";
import { Product } from "@/lib/store/product";

export const addToCart =
  (get: () => CartStore, set: any) =>
  (product: Product, quantity: number = 1) => {
    const current = get().cart;
    const isHoldMode = get().holdMode;
    const exists = current.find(
      (item) =>
        item.product.productId.toString() === product.productId.toString()
    );

    if (exists) {
      set({
        cart: current.map((item) =>
          item.product.productId === product.productId
            ? {
                ...item,
                quantity: item.quantity + quantity,
              }
            : item
        ),
      });
    } else {
      set({
        cart: [...current, { product, quantity }],
      });
    }

    // ✨ ตัวอย่าง: log ดูตอน hold mode
    if (isHoldMode) {
      console.log(`[Hold Mode] เพิ่ม ${product.name} จำนวน ${quantity}`);
    }
  };
