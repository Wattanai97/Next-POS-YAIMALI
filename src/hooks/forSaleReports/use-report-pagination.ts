// hooks/useSalesReportPagination.ts
import { useOrder_HoldOrderStore } from "@/lib/store/orders/hold-orders/useorders-holdorders";
import { useMemo, useState } from "react";
import { OrderType } from "@/app/types/zustand/orders/use-order-holdorder-store-type";
const ORDERS_PER_PAGE = 10; // Static ORDERS_PER_PAGE
export type DateRangeType = "daily" | "weekly" | "monthly" | "all"; // DateRange Type

export const useSalesReportPagination = () => {
  const orders: OrderType[] = useOrder_HoldOrderStore((state) => state.orders);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [tempDate, setTempDate] = useState<Date | null>(null);
  const [dateRange, setDateRange] = useState<DateRangeType>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedOrders, setExpandedOrders] = useState<number[]>([]);

  // ใช้ useMemo เพื่อให้เรนเดอร์ เฉพาะตอน orders, หรือ selectedDate มีการเปลี่ยนแปลงค่า
  const filteredOrders = useMemo(() => {
    if (!Array.isArray(orders)) return [];

    const sorted = [...orders].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    if (!selectedDate || dateRange === "all") return sorted;

    const endDate = new Date(selectedDate);
    endDate.setHours(23, 59, 59, 999); // ครอบคลุมทั้งวันที่เลือก

    const startDate = new Date(selectedDate);

    const rangeMap = {
      daily: 1,
      weekly: 7,
      monthly: 30,
    };

    const days = rangeMap[dateRange];

    startDate.setDate(startDate.getDate() - (days - 1));
    startDate.setHours(0, 0, 0, 0); // เริ่มตั้งแต่เที่ยงคืนวันแรกของช่วง

    return sorted.filter((order) => {
      const orderDate = new Date(order.createdAt);
      return orderDate >= startDate && orderDate <= endDate;
    });
  }, [orders, selectedDate, dateRange]);

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
