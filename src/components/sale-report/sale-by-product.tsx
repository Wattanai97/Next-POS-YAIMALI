// "use client";
// import SalesSummaryTable from "../ui/sale-by-product/sale-by-product-list";
// import { useSalesReportPagination } from "@/hooks/forSaleReports/use-report-pagination";
// import { useSalesSummaryByProduct } from "@/hooks/forSaleReports/use-sales-sumby-productfrom-pagination";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import DateFilterToolbar from "../ui/sale-by-product/date-filter-toolbar";

// export default function SalesByProductPage() {
//   const {
//     dateRange,
//     setDateRange,
//     selectedDate,
//     setSelectedDate,
//     tempDate,
//     setTempDate,
//     setCurrentPage,
//     productPrefix,
//     setProductPrefix,
//     displayedOrders
//   } = useSalesReportPagination();

//   const sales = useSalesSummaryByProduct(displayedOrders,productPrefix);

//   return (
//     <div className="p-4 space-y-6">
//       {/* ✅ ส่ง props ไปให้ DateFilterToolbar */}
//       <DateFilterToolbar
//         dateRange={dateRange}
//         setDateRange={setDateRange}
//         selectedDate={selectedDate}
//         setSelectedDate={setSelectedDate}
//         tempDate={tempDate}
//         setTempDate={setTempDate}
//         setCurrentPage={setCurrentPage}
//         productPrefix={productPrefix}
//         setProductPrefix={setProductPrefix}
//       />

//       {/* แสดงสรุปยอดขาย */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//         <SalesSummaryTable salesSummary={sales} />
//       </div>
//     </div>
//   );
// }
