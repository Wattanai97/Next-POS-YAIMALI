"use client";
import LineChartCustomer from "./linechart-customer";
import LineChartTotal from "./linechart-total";
import { Card, CardContent } from "@/components/ui/card";
import { useOrder_HoldOrderStore } from "@/lib/store/orders/hold-orders/useorders-holdorders";
import TableViewTransactions from "./tableview-transactions";
import CardViewTransactions from "./cardview-transactions";
import LoadingSpinner from "../loading-error/loading-spiner";
export default function Dashboard() {
  const { orders } = useOrder_HoldOrderStore();
  if (orders.length === 0 || !orders) <LoadingSpinner />;
  return (
    <div>
      {/* Order Card,Transaction bill View */}
      {orders.length > 0 && <CardViewTransactions />}
      {/* Order Table View */}
      {orders.length > 0 && <TableViewTransactions />}
      <Card className="w-full overflow-x-auto lg:col-span-2">
        {/* Sales Report & Customer Report LineChart */}
        <CardContent className="p-1.5">
          <h2 className="text-xl font-bold mb-2 text-center">Sales Report</h2>
          {/* กราฟ Total Sales */}
          <LineChartTotal />
          {/* กราฟ Customer Count */}
          <LineChartCustomer />
        </CardContent>
      </Card>
    </div>
  );
}
