// hooks/useOrdersPagination.ts
import { useMemo } from "react";
import { IOrder } from "@/lib/store/orderStore";

export function useOrdersPagination(
  orders: IOrder[],
  currentPage: number,
  itemsPerPage: number
) {
//   const { currentPage, itemsPerPage } = useOrderCardViewPaginationStore();

  const sortedOrders = useMemo(() => {
    return [...orders].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }, [orders]);

  const displayedOrders = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return sortedOrders.slice(start, start + itemsPerPage);
  }, [sortedOrders, currentPage, itemsPerPage]);

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
