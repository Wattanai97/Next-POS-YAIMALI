"use client";
import { useOrder_HoldOrderStore } from "@/lib/store/orders/hold-orders/useorders-holdorders";
import { useMemo, useState } from "react";

export type DateRangeType = "daily" | "weekly" | "monthly" | "all";
export type CategoryFilterType =
  | "ก๋วยเตี๋ยวเนื้อ"
  | "ก๋วยเตี๋ยวหมู"
  | "เกาเหลาเนื้อ"
  | "เกาเหลาหมู"
  | "ข้าวกะเพราเนื้อ"
  | "ข้าวกะเพราหมู"
  | "เส้นกะเพราเนื้อ"
  | "เส้นกะเพราหมู"
  | "ชาไทย"
  | "ชาเขียว"
  | "นมสดยายมะลิ"
  | "โกโก้"
  | "ทั้งหมด";

export const useSalesByProductPagination = () => {
  const { orders } = useOrder_HoldOrderStore();

  // 🔹 ค่าชั่วคราวก่อนยืนยัน
  const [tempDate, setTempDate] = useState<Date | null>(null);
  const [tempRange, setTempRange] = useState<DateRangeType>("all");
  const [tempCategory, setTempCategory] =
    useState<CategoryFilterType>("ทั้งหมด");

  // 🔹 ค่าที่ใช้จริงหลังยืนยัน
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [dateRange, setDateRange] = useState<DateRangeType>("all");
  const [category_Product, setCategory_Product] =
    useState<CategoryFilterType>("ทั้งหมด");

  const confirmed = selectedDate && dateRange !== "all";
  const rangeMap = { daily: 1, weekly: 7, monthly: 30 };

  const startDate = useMemo(() => {
    if (!confirmed) return null;
    const start = new Date(selectedDate!);
    start.setDate(start.getDate() - (rangeMap[dateRange] - 1));
    start.setHours(0, 0, 0, 0);
    return start;
  }, [selectedDate, dateRange, confirmed, rangeMap]);

  const endDate = useMemo(() => {
    if (!confirmed) return null;
    const end = new Date(selectedDate!);
    end.setHours(23, 59, 59, 999);
    return end;
  }, [selectedDate, confirmed]);

  const filteredOrders = useMemo(() => {
    if (!Array.isArray(orders)) return [];
    let sorted = [...orders].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    if (!startDate || !endDate) return sorted;

    return sorted.filter((order) => {
      const orderDate = new Date(order.createdAt);
      return orderDate >= startDate && orderDate <= endDate;
    });
  }, [orders, startDate, endDate]);

  const filteredItems = useMemo(() => {
    return filteredOrders.flatMap((order) =>
      order.items.filter((item) =>
        category_Product === "ทั้งหมด"
          ? true
          : item.product.startsWith(category_Product)
      )
    );
  }, [filteredOrders, category_Product]);

  const handleConfirm = () => {
    setSelectedDate(tempDate);
    setDateRange(tempRange);
    setCategory_Product(tempCategory);
  };

  return {
    // 🔸 ชุดชั่วคราว
    tempDate,
    setTempDate,
    tempRange,
    setTempRange,
    tempCategory,
    setTempCategory,
    // 🔸 ค่าที่ใช้จริง
    selectedDate,
    dateRange,
    category_Product,
    startDate,
    endDate,
    handleConfirm,
    // 🔸 รายการหลังกรอง
    filteredItems,
  };
};
