import LineChartCustomer from "./extendcompdashboard/LineChartCustomer";
import LineChartTotal from "./extendcompdashboard/LineChartTotal";
import { Card, CardContent } from "@/components/ui/card";
import { useOrderStore } from "@/lib/store/orderStore";
import TableViewTransactions from "./extendcompdashboard/TableViewTransactions";
import CardViewTransactions from "./extendcompdashboard/CardViewTransactions";
import LoadingSpinner from "./LoadingSpiner";
export default function Dashboard() {
  const { orders } = useOrderStore();
  if (orders.length === 0 || !orders) <LoadingSpinner />;

  return (
    <div>
      {/* Order Card,Transactionbill View */}
      {orders.length > 0 && <CardViewTransactions />}
      {/* Order Table View */}
      {orders.length > 0 && <TableViewTransactions />}
      {/* Sales Report & Customer Report LineChart */}
      <Card className="w-full overflow-x-auto lg:col-span-2">
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
