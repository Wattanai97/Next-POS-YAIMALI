import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import Pagecontroltableview from "./pagecontrol-tableview";
import React from "react";
import { useOrdersPagination } from "../../hooks/forDashBoard/use-order-pagination";
import { formatThaiShortDate } from "../../utils/dashboard/format-date-dashboard";
import { useOrderStore } from "@/lib/store/orders/hold-orders/useorders-hold-orders";
import { useOrderTableViewPaginationStore } from "@/lib/store/orders/useorder-pagination-store";
const Tableviewtransactions = () => {
  const orders = useOrderStore((state) => state.orders);
  const { currentPage, itemsPerPage } = useOrderTableViewPaginationStore();
  const { displayedOrders } = useOrdersPagination(
    orders,
    currentPage,
    itemsPerPage
  );
  return (
    <>
      <div className="p-6 xxs:grid xxs:grid-cols-1 md:grid md:grid-cols-2 lg:grid lg:grid-cols-2 gap-6">
        {displayedOrders?.length > 0 ? (
          <Card className="w-full overflow-hidden lg:col-span-2">
            <CardContent className="p-2">
              <h2 className="text-xl text-center font-bold mb-2">
                Transaction Table
              </h2>
              <div className="w-full overflow-x-auto">
                <Table className="min-w-[300px]">
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order#</TableHead>
                      <TableHead>ลูกค้า</TableHead>
                      <TableHead>ยอด</TableHead>
                      <TableHead>วันที่</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {displayedOrders.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>{item.num}</TableCell>
                        <TableCell>{item.customerCount}</TableCell>
                        <TableCell className="font-semibold">
                          {item.total}฿
                        </TableCell>
                        <TableCell>
                          {formatThaiShortDate(item.createdAt)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        ) : (
          <p className="text-center text-gray-500">No orders found.</p>
        )}
      </div>
      {/* pageControl */}
      <div className="flex justify-center">
        <Pagecontroltableview />
      </div>
      {/*  */}
    </>
  );
};

export default Tableviewtransactions;
