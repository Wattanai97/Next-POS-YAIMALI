import React, { useMemo } from "react";
import { useOrderStore } from "@/lib/store/useOrdersAndHoldOrders";
import { formatThaiShortDateForReport } from "../forDashBoardPage/logic/forMatDate";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
const LineChartCustomer = () => {
  const { orders } = useOrderStore();
  const salesChartData = useMemo(() => {
    return orders.map((order) => ({
      date: formatThaiShortDateForReport(order.createdAt), // แปลงวันที่ให้อยู่ในรูปแบบไทย
      total: order.total, // ยอดขายรวม
      customers: order.customerCount, // จำนวนลูกค้า
    }));
  }, [orders]);
  return (
    <>
      <div className="w-full h-[200px] sm:h-[250px] md:h-[300px] mt-6 text-black">
        <hr />
        <h3 className="text-lg font-semibold text-center mb-2 text-black dark:text-white">
          Customer Count
        </h3>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={salesChartData}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="customers"
              stroke="#82ca9d"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default LineChartCustomer;
