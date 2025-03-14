"use client";

import { useOrderStore } from "@/lib/store/orderStore";
import { useState, useMemo } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function SalesReportPage() {
  const orders = useOrderStore((state) => state.orders);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [expandedOrders, setExpandedOrders] = useState<number[]>([]);

  const toggleDetails = (orderNum: number) => {
    setExpandedOrders((prev) =>
      prev.includes(orderNum)
        ? prev.filter((num) => num !== orderNum)
        : [...prev, orderNum]
    );
  };

  const formatDateUTC = (date: Date) =>
    new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate())
      .toISOString()
      .split("T")[0];

  const filteredOrders = useMemo(() => {
    if (!Array.isArray(orders)) return [];
    const sortedOrders = [...orders].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    return selectedDate
      ? sortedOrders.filter(
          (order) =>
            formatDateUTC(new Date(order.createdAt)) ===
            formatDateUTC(selectedDate)
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

  return (
    <div className="p-5 max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>📊 รายงานยอดขาย</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between">
            <label className="font-semibold">เลือกวันที่: </label>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              dateFormat="yyyy-MM-dd"
              className="border p-2 rounded w-full md:w-auto mt-2 md:mt-0"
            />
          </div>

          <div className="bg-gray-100 p-4 rounded-lg text-center font-semibold text-lg">
            📈 ยอดขายรวม: ฿{totalSales.toLocaleString()} | 👥 ลูกค้า:{" "}
            {totalCustomers} คน | 🛒 ออเดอร์: {totalOrders} รายการ
          </div>

          {filteredOrders.length === 0 ? (
            <p className="text-center text-gray-500 mt-4">
              ไม่มีออเดอร์ในวันที่เลือก
            </p>
          ) : (
            filteredOrders.map((order) => (
              <Card key={order.num} className="mt-4">
                <CardContent>
                  <p>
                    📅 วันที่: {new Date(order.createdAt).toLocaleDateString()}
                  </p>
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
                            🍜 {item.product} ({item.quantity}x) - ฿{item.price}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}
