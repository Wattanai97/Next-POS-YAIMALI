"use client";
import "react-datepicker/dist/react-datepicker.css";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSalesReport } from "../hooks/forSaleReports/use-report-pagination";
import { generateDateList } from "../hooks/forSaleReports/genarate-datelist";
import DateFilterToolbar from "./forSaleReportPage/date-filter";
import PaginationControls from "./forSaleReportPage/report-page-control";
import OrderCard from "./forSaleReportPage/order-card";
export default function SalesReportPage() {
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
            dateRange={dateRange}
            setDateRange={setDateRange}
          />

          <div className="bg-gray-100 dark:text-slate-950 p-4 rounded-lg text-center font-semibold text-lg">
            📈 ยอดขายรวม: ฿{totalSales.toLocaleString()} | 👥 ลูกค้า:{" "}
            {totalCustomers} คน | 🛒 ออเดอร์: {totalOrders} รายการ
          </div>

          <div className="mt-4 max-h-[500px] overflow-auto">
            {dateRange === "daily" ? (
              // รายวัน
              displayedOrders.length === 0 ? (
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
              )
            ) : dateRange === "all" ? (
              // ✅ รองรับกรณี "all"
              displayedOrders.length === 0 ? (
                <p className="text-center text-gray-500 mt-4">
                  ไม่มีออเดอร์ในระบบ
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
              )
            ) : (
              // รายสัปดาห์/เดือน
              (tempDate &&
                (dateRange === "weekly" || dateRange === "monthly") &&
                generateDateList(tempDate, dateRange).map((date) => {
                  const ordersForDate = displayedOrders.filter(
                    (order) =>
                      new Date(order.createdAt).toDateString() ===
                      date.toDateString()
                  );

                  return ordersForDate.length === 0 ? (
                    <div
                      key={date.toISOString()}
                      className="border border-gray-300 rounded-lg p-4 bg-gray-100 dark:bg-gray-800 text-center text-gray-500 dark:text-gray-300 mb-2"
                    >
                      <p className="font-medium">
                        ไม่มียอดขายในวันที่ {date.toLocaleDateString("th-TH")}
                      </p>
                    </div>
                  ) : (
                    ordersForDate.map((order) => (
                      <OrderCard
                        key={order.num}
                        order={order}
                        isExpanded={expandedOrders.includes(order.num)}
                        toggleDetails={toggleDetails}
                      />
                    ))
                  );
                })) || (
                <p className="text-center text-gray-500 mt-4">
                  ไม่มีข้อมูลวันที่
                </p>
              )
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
