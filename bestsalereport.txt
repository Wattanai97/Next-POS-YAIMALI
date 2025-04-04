"use client";

import { useOrderStore } from "@/lib/store/orderStore";
import { useState, useMemo } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ORDERS_PER_PAGE = 10;

export default function SalesReportPage() {
  const orders = useOrderStore((state) => state.orders);
  const [tempDate, setTempDate] = useState<Date | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [expandedOrders, setExpandedOrders] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const toggleDetails = (orderNum: number) => {
    setExpandedOrders((prev) =>
      prev.includes(orderNum)
        ? prev.filter((num) => num !== orderNum)
        : [...prev, orderNum]
    );
  };
  const formatTime = (date: Date) => {
    return `${String(date.getHours()).padStart(2, "0")}:${String(
      date.getMinutes()
    ).padStart(2, "0")}:${String(date.getSeconds()).padStart(2, "0")} น.`;
  };
  const formatDate = (date: Date) => {
    return `${String(date.getDate()).padStart(2, "0")}/${String(
      date.getMonth() + 1
    ).padStart(2, "0")}/${date.getFullYear()}`;
  };

  const filteredOrders = useMemo(() => {
    if (!Array.isArray(orders)) return [];
    const sortedOrders = [...orders].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    return selectedDate
      ? sortedOrders.filter(
          (order) =>
            new Date(order.createdAt).toDateString() ===
            selectedDate.toDateString()
        )
      : sortedOrders;
  }, [orders, selectedDate]);

  const totalSales = filteredOrders.reduce(
    (sum, order) => sum + order.total,
    0
  );
  const totalCustomers = filteredOrders.reduce(
    (sum, order) => sum + order.customerCount,
    0
  );
  const totalOrders = filteredOrders.length;

  // Pagination Logic
  const totalPages = Math.ceil(totalOrders / ORDERS_PER_PAGE);
  const displayedOrders = filteredOrders.slice(
    (currentPage - 1) * ORDERS_PER_PAGE,
    currentPage * ORDERS_PER_PAGE
  );

  return (
    <div className="p-5 max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>📊 รายงานยอดขาย</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
            <div className="flex flex-col md:flex-row md:items-center gap-2">
              <label className="font-semibold">เลือกวันที่: </label>
              <DatePicker
                selected={tempDate}
                onChange={(date) => setTempDate(date)}
                dateFormat="dd/MM/yyyy"
                className="border p-2 rounded w-full md:w-auto"
              />
              <Button
                onClick={() => {
                  setSelectedDate(tempDate);
                  setCurrentPage(1);
                }}
              >
                ✅ ยืนยันวันที่
              </Button>
            </div>
            <Button
              variant="outline"
              onClick={() => {
                setSelectedDate(null);
                setTempDate(null);
                setCurrentPage(1);
              }}
            >
              📅 ดูทุกรายการ
            </Button>
          </div>

          <div className="bg-gray-100 dark:text-slate-950 p-4 rounded-lg text-center font-semibold text-lg">
            📈 ยอดขายรวม: ฿{totalSales.toLocaleString()} | 👥 ลูกค้า:{" "}
            {totalCustomers} คน | 🛒 ออเดอร์: {totalOrders} รายการ
          </div>

          <div className="mt-4 max-h-[500px] overflow-auto">
            {displayedOrders.length === 0 ? (
              <p className="text-center text-gray-500 mt-4">
                ไม่มีออเดอร์ในวันที่เลือก
              </p>
            ) : (
              displayedOrders.map((order) => (
                <Card key={order.num} className="mt-4">
                  <CardContent>
                    <p>📅 วันที่: {formatDate(new Date(order.createdAt))}</p>
                    <p>⏰ เวลา: {formatTime(new Date(order.createdAt))}</p>
                    <p>🛒 ออเดอร์ที่ {order.num}</p>
                    <p>💰 ยอดรวม: ฿{order.total}</p>
                    <p>👥 ลูกค้า: {order.customerCount} คน</p>
                    <Button
                      className="mt-2"
                      variant="outline"
                      size="sm"
                      onClick={() => toggleDetails(order.num)}
                    >
                      {expandedOrders.includes(order.num)
                        ? "🔽 ซ่อนรายละเอียด"
                        : "🔍 ดูรายละเอียด"}
                    </Button>
                    {expandedOrders.includes(order.num) && (
                      <div className="mt-3 border-t pt-2">
                        <p className="font-semibold">📦 รายการสินค้า:</p>
                        <ul className="mt-2">
                          {order.items.map((item, index) => (
                            <li key={index} className="border-b py-1">
                              🍜 {item.product} ({item.quantity}x) - ฿
                              {item.price}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))
            )}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-4 space-x-2">
              <Button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                ⬅️ ก่อนหน้า
              </Button>
              <span className="px-4 py-2 font-semibold">
                หน้า {currentPage} / {totalPages}
              </span>
              <Button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                ถัดไป ➡️
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
