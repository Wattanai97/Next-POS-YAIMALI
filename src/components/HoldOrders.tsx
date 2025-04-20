import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useOrderStore } from "@/lib/store/orderStore";
import { useSalesReport } from "./logicsalereport/useSaleReportPagination";
import PullHoldOrder from "./PullHoldOrders";
const HoldOrders = () => {
  const { expandedOrders, toggleDetails } = useSalesReport();
  const { holdorders } = useOrderStore();
  return (
    <div className="bg-slate-300 dark:bg-black/80 mx-auto max-w-4xl  lg:max-h-[800px] lg:overflow-auto my-3  p-2 rounded-lg">
      <Card>
        <CardHeader>
          <CardTitle>📊 รายการยังไม่คิดเงิน </CardTitle>
        </CardHeader>
        <CardContent>
          {holdorders.length > 0 ? (
            holdorders.map((order) => (
              <PullHoldOrder
                key={order.num}
                holdorders={order}
                isExpanded={expandedOrders.includes(order.num)}
                toggleDetails={toggleDetails}
              />
            ))
          ) : (
            <p className="text-center font-bold text-red-500 text-3xl my-6">
              Please Wait To Fetch
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default HoldOrders;
