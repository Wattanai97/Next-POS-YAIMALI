// hooks/useSalesReport.ts
import { useOrderStore } from "@/lib/store/useorders-hold-orders";
import { useMemo, useState } from "react";
import { IOrder } from "@/lib/store/useorders-hold-orders";
const ORDERS_PER_PAGE = 10;

export const useSalesReport = () => {
  const orders: IOrder[] = useOrderStore((state) => state.orders);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [tempDate, setTempDate] = useState<Date | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedOrders, setExpandedOrders] = useState<number[]>([]);

  // ใช้ useMemo เพื่อให้เรนเดอร์ เฉพาะตอน orders, หรือ selectedDate มีการเปลี่ยนแปลงค่า
  const filteredOrders = useMemo(() => {
    if (!Array.isArray(orders)) return [];
    const sorted = [...orders].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    return selectedDate
      ? sorted.filter(
          (order) =>
            new Date(order.createdAt).toDateString() ===
            selectedDate.toDateString()
        )
      : sorted;
  }, [orders, selectedDate]);

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
