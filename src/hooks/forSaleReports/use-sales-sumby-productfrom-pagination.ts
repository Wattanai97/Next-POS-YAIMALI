import { useMemo } from "react";
import { OrderType } from "@/app/types/zustand/orders/use-order-holdorder-store-type";

export const useSalesSummaryByProduct = (
  displayedOrders: OrderType[],
  productPrefix: string
) => {
  const filteredOrders = useMemo(() => {
    if (!productPrefix) return displayedOrders;
    return displayedOrders.filter((order) =>
      order.items.some((item) => item.product.startsWith(productPrefix))
    );
  }, [displayedOrders, productPrefix]);

  const summaryMap = useMemo(() => {
    const map = new Map<string, { quantity: number; total: number }>();

    for (const order of filteredOrders) {
      for (const item of order.items) {
        if (!productPrefix || item.product.startsWith(productPrefix)) {
          const existing = map.get(item.product) || { quantity: 0, total: 0 };
          map.set(item.product, {
            quantity: existing.quantity + item.quantity,
            total: existing.total + item.price * item.quantity,
          });
        }
      }
    }

    return Array.from(map.entries()).map(([product, { quantity, total }]) => ({
      product,
      quantity,
      total,
    }));
  }, [filteredOrders, productPrefix]);
  console.log("▶️ Orders ที่รับมา:", displayedOrders);
  console.log("🔎 productPrefix ที่เลือก:", productPrefix);
  console.log("🧾 ผลลัพธ์ที่ return:", summaryMap);
  return summaryMap;
};
