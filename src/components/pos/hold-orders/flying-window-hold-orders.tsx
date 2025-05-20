import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useOrder_HoldOrderStore } from "@/lib/store/orders/hold-orders/useorders-holdorders";
import { useSalesReportPagination } from "@/hooks/forSaleReports/use-report-pagination";
import { RestoreAndUpdate } from "../../../hooks/forPosPage/restore-update-order";
import DetailOrdersHold from "./detail-order-hold";

const MainWindowHoldOrders = () => {
  const { expandedOrders, toggleDetails } = useSalesReportPagination();
  const { holdorders } = useOrder_HoldOrderStore();
  return (
    <div className="bg-slate-300 dark:bg-black/80 mx-auto max-w-4xl  lg:max-h-[800px] lg:overflow-auto my-3  p-2 rounded-lg">
      <Card>
        <CardHeader>
          <CardTitle>📊 รายการยังไม่คิดเงิน </CardTitle>
        </CardHeader>
        <CardContent>
          {holdorders.length > 0 ? (
            holdorders.map((order) => (
              <div key={order.num}>
                <DetailOrdersHold
                  key={order.num}
                  holdorders={order}
                  isExpanded={expandedOrders.includes(order.num)}
                  toggleDetails={toggleDetails}
                />
                <div className="flex justify-center my-3">
                  <RestoreAndUpdate items={order.items} orderNum={order.num} />
                </div>
              </div>
            ))
          ) : (
            <p className="text-center animate-bounce font-bold text-red-500 text-3xl my-6">
              ไม่มีรายการที่ค้างไว
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MainWindowHoldOrders;
