// hooks/useOrdersPagination.ts
import { useMemo } from "react";
import { IOrder } from "@/lib/store/orders/hold-orders/useorders-hold-orders";

export function useOrdersPagination(
  orders: IOrder[],
  currentPage: number,
  itemsPerPage: number
) {
  //  Sort Array จากวันที่
  const sortedOrders = useMemo(() => {
    return [...orders].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }, [orders]);
  //   คำนวน
  const displayedOrders = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return sortedOrders.slice(start, start + itemsPerPage);
  }, [sortedOrders, currentPage, itemsPerPage]);
  // คำนวนหน้าทั้งหมดที่ต้องแบ่ง จาก sortedOrders.length หารกับ itemsPerPage
  const totalPages = useMemo(
    () => Math.ceil(sortedOrders.length / itemsPerPage),
    [sortedOrders, itemsPerPage]
  );
  return {
    displayedOrders,
    currentPage,
    totalPages,
  };
}
