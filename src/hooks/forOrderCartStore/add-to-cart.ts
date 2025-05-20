//useOrderCartStore addToCart Logic
import { ProductType } from "@/app/types/product-type";
import { CartStoreType } from "@/app/types/zustand/orders/use-order-cart-store-type";

export const addToCart =
  (get: () => CartStoreType, set: ({}) => void) =>
  (product: ProductType, quantity: number = 1) => {
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
