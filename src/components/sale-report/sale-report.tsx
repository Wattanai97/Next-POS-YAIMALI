"use client";
import "react-datepicker/dist/react-datepicker.css"; // Date-Picker
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; // Card ShadCNUI
import { useSalesReportPagination } from "../../hooks/forSaleReports/use-report-pagination"; // SaleReportPagination

import DateFilterToolbar from "./date-filter";
import PaginationControls from "./report-page-control";
import OrderCard from "./order-card";

export default function SalesReport() {
  const {
    dateRange,
    setDateRange,
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
    totalPages, // from daily/all
  } = useSalesReportPagination();

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
            dateRange={dateRange}
            setDateRange={setDateRange}
          />

          <div className="bg-gray-100 dark:text-slate-950 p-4 rounded-lg text-center font-semibold text-lg">
            📈 ยอดขายรวม: ฿{totalSales.toLocaleString()} | 👥 ลูกค้า:{" "}
            {totalCustomers} คน | 🛒 ออเดอร์: {totalOrders} รายการ
          </div>

          <div className="mt-4 max-h-[500px] overflow-auto">
            {displayedOrders.length === 0 ? (
              <p className="text-center mt-4 text-gray-500">
                {dateRange === "daily"
                  ? "ไม่มีออเดอร์ในวันที่เลือก"
                  : dateRange === "weekly"
                  ? "ไม่มีออเดอร์ในสัปดาห์นี้"
                  : dateRange === "monthly"
                  ? "ไม่มีออเดอร์ในเดือนนี้"
                  : "ไม่มีออเดอร์ในระบบ"}
              </p>
            ) : (
              displayedOrders.map((o) => (
                <OrderCard
                  key={o.num}
                  order={o}
                  isExpanded={expandedOrders.includes(o.num)}
                  toggleDetails={toggleDetails}
                />
              ))
            )}
          </div>

          {/* Pagination */}
          {(dateRange === "daily" || dateRange === "all") && totalPages > 1 && (
            <PaginationControls
              currentPage={currentPage}
              totalPages={totalPages}
              setCurrentPage={setCurrentPage}
            />
          )}
          {(dateRange === "weekly" || dateRange === "monthly") &&
            totalPages > 1 && (
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
