import { useMemo } from "react";
import { generateDateList } from "./genarate-datelist";
import { IOrder } from "@/lib/store/useorders-hold-orders";

const CARDS_PER_PAGE = 10;

export function useGroupedOrders(
  filteredOrders: IOrder[],
  selectedDate: Date | null,
  dateRange: "daily" | "weekly" | "monthly",
  currentPage: number
) {
  const fullDateList = useMemo(() => {
    if (!selectedDate || dateRange === "daily") return [];
    return generateDateList(selectedDate, dateRange);
  }, [selectedDate, dateRange]);

  // เตรียมรายการ groupedOrders ทั้งหมด (รวมวันไม่มีออเดอร์ด้วย)
  const allCards = useMemo(() => {
    return fullDateList.map((date) => {
      const day = date.toDateString();
      const orders = filteredOrders.filter(
        (o) => new Date(o.createdAt).toDateString() === day
      );
      return { date, orders };
    });
  }, [fullDateList, filteredOrders]);

  const totalPages = useMemo(
    () => Math.ceil(allCards.length / CARDS_PER_PAGE),
    [allCards.length]
  );

  const groupedOrders = useMemo(() => {
    const start = (currentPage - 1) * CARDS_PER_PAGE;
    return allCards.slice(start, start + CARDS_PER_PAGE);
  }, [allCards, currentPage]);

  return { groupedOrders, totalPages };
}
