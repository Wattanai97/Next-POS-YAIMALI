"use client";
import "react-datepicker/dist/react-datepicker.css";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSalesReport } from "./forSaleReportPage/logic/useSaleReportPagination";
import DateFilterToolbar from "./forSaleReportPage/Datefilter";
import PaginationControls from "./forSaleReportPage/PaginationControl";
import OrderCard from "./forSaleReportPage/OrderCard";
export default function SalesReportPage() {
  const {
    tempDate,
    setTempDate,
    setSelectedDate,
    currentPage,
    setCurrentPage,
    expandedOrders,
    toggleDetails,
    displayedOrders,
    totalSales,
    totalCustomers,
    totalOrders,
    totalPages,
  } = useSalesReport();
  return (
    <div className="p-5 max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>📊 รายงานยอดขาย</CardTitle>
        </CardHeader>
        <CardContent>
          <DateFilterToolbar
            tempDate={tempDate}
            setTempDate={setTempDate}
            setSelectedDate={setSelectedDate}
            setCurrentPage={setCurrentPage}
          />

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
                <OrderCard
                  key={order.num}
                  order={order}
                  isExpanded={expandedOrders.includes(order.num)}
                  toggleDetails={toggleDetails}
                />
              ))
            )}
          </div>

          {totalPages > 1 && (
            <PaginationControls
              currentPage={currentPage}
              totalPages={totalPages}
              setCurrentPage={setCurrentPage}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
