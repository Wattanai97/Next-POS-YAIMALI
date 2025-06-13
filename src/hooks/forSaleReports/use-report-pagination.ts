"use client";
import { useOrder_HoldOrderStore } from "@/lib/store/orders/hold-orders/useorders-holdorders";
import { useMemo, useState } from "react";

const ORDERS_PER_PAGE = 10;

export type DateRangeType = "daily" | "weekly" | "monthly" | "all";

export const useSalesReportPagination = () => {
  const { orders } = useOrder_HoldOrderStore();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [tempDate, setTempDate] = useState<Date | null>(null);
  const [dateRange, setDateRange] = useState<DateRangeType>("all");

  const [currentPage, setCurrentPage] = useState(1);
  const [expandedOrders, setExpandedOrders] = useState<number[]>([]);

  const filteredOrders = useMemo(() => {
    if (!Array.isArray(orders)) return [];

    const sorted = [...orders].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    if (!selectedDate || dateRange === "all") return sorted;

    const endDate = new Date(selectedDate);
    endDate.setHours(23, 59, 59, 999);

    const startDate = new Date(selectedDate);
    const rangeMap = {
      daily: 1,
      weekly: 7,
      monthly: 30,
    };
    const days = rangeMap[dateRange];
    startDate.setDate(startDate.getDate() - (days - 1));
    startDate.setHours(0, 0, 0, 0);

    return sorted.filter((order) => {
      const orderDate = new Date(order.createdAt);
      return orderDate >= startDate && orderDate <= endDate;
    });
  }, [orders, selectedDate, dateRange]);

  // toggle expand order details
  const toggleDetails = (orderNum: number) => {
    setExpandedOrders((prev) =>
      prev.includes(orderNum)
        ? prev.filter((n) => n !== orderNum)
        : [...prev, orderNum]
    );
  };

  const totalSales = filteredOrders.reduce((sum, o) => sum + o.total, 0);
  const totalCustomers = filteredOrders.reduce(
    (sum, o) => sum + o.customerCount,
    0
  );
  const totalOrders = filteredOrders.length;
  const totalPages = Math.ceil(totalOrders / ORDERS_PER_PAGE);
  const displayedOrders = filteredOrders.slice(
    (currentPage - 1) * ORDERS_PER_PAGE,
    currentPage * ORDERS_PER_PAGE
  );

  return {
    tempDate,
    setTempDate,
    selectedDate,
    setSelectedDate,
    dateRange,
    setDateRange,
    currentPage,
    setCurrentPage,
    expandedOrders,
    toggleDetails,
    displayedOrders,
    totalSales,
    totalCustomers,
    totalOrders,
    totalPages,
  };
};
