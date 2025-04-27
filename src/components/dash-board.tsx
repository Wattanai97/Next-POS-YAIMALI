import { useEffect } from "react";
import LineChartCustomer from "./forDashBoardPage/linechart-customer";
import LineChartTotal from "./forDashBoardPage/linechart-total";
import { Card, CardContent } from "@/components/ui/card";
import { useOrderStore } from "@/lib/store/useorders-hold-orders";
import TableViewTransactions from "./forDashBoardPage/tableview-transactions";
import CardViewTransactions from "./forDashBoardPage/cardview-transactions";
import LoadingSpinner from "./loading-spiner";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
export default function Dashboard() {
  const router = useRouter();
  const { data: session } = useSession();
  useEffect(() => {
    if (!session?.user.username) {
      router.push("/auth/login");
    }
  }, [session?.user.username]);
  const { orders } = useOrderStore();
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
