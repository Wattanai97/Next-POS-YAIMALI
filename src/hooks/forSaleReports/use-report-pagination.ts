import { useOrderStore } from "@/lib/store/useorders-hold-orders";
import { useMemo, useState } from "react";
import { IOrder } from "@/lib/store/useorders-hold-orders";

const ORDERS_PER_PAGE = 10;

export type DateRangeType = "daily" | "weekly" | "monthly" | "all";

export const useSalesReport = () => {
  const orders: IOrder[] = useOrderStore((s) => s.orders);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [tempDate, setTempDate] = useState<Date | null>(null);
  const [dateRange, setDateRange] = useState<DateRangeType>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedOrders, setExpandedOrders] = useState<number[]>([]);

  const filteredOrders = useMemo(() => {
    if (!Array.isArray(orders)) return [];
    // sort descending
    const sorted = [...orders].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    if (!selectedDate || dateRange === "all") return sorted;
    // build date range
    const end = new Date(selectedDate);
    end.setHours(23, 59, 59, 999);
    const start = new Date(selectedDate);
    const span = { daily: 1, weekly: 7, monthly: 30 }[dateRange];
    start.setDate(start.getDate() - (span - 1));
    start.setHours(0, 0, 0, 0);
    return sorted.filter((o) => {
      const d = new Date(o.createdAt);
      return d >= start && d <= end;
    });
  }, [orders, selectedDate, dateRange]);

  const totalOrders = filteredOrders.length;
  const totalPages = Math.ceil(totalOrders / ORDERS_PER_PAGE);

  const displayedOrders = useMemo(() => {
    const start = (currentPage - 1) * ORDERS_PER_PAGE;
    return filteredOrders.slice(start, start + ORDERS_PER_PAGE);
  }, [filteredOrders, currentPage]);

  const totalSales = filteredOrders.reduce((s, o) => s + o.total, 0);
  const totalCustomers = filteredOrders.reduce(
    (s, o) => s + o.customerCount,
    0
  );

  const toggleDetails = (n: number) => {
    setExpandedOrders((prev) =>
      prev.includes(n) ? prev.filter((x) => x !== n) : [...prev, n]
    );
  };

  return {
    filteredOrders, // <-- เพิ่มอันนี้
    displayedOrders,
    dateRange,
    setDateRange,
    tempDate,
    setTempDate,
    selectedDate, // <-- เพิ่มอันนี้
    setSelectedDate,
    currentPage,
    setCurrentPage,
    expandedOrders,
    toggleDetails,
    totalSales,
    totalCustomers,
    totalOrders,
    totalPages,
  };
};
