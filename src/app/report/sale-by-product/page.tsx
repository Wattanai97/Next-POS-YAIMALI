"use client";
import React from "react";
import DateFilterToolbar from "@/components/ui/sale-by-product/date-filter-toolbar";
import { useSalesReportPagination } from "@/hooks/forSaleReports/use-report-pagination";
import { useSalesSummaryByProduct } from "@/hooks/forSaleReports/use-sales-sumby-productfrom-pagination";
import SalesSummaryTable from "@/components/ui/sale-by-product/sale-by-product-list";

export default function SalesReportPage() {
  const {
    tempDate,
    setTempDate,
    selectedDate,
    setSelectedDate,
    dateRange,
    setDateRange,
    productPrefix,
    setProductPrefix,
    currentPage,
    setCurrentPage,
    displayedOrders,
  } = useSalesReportPagination();

  // เอา orders ที่แสดง (filtered + paginated) มา summary ตาม product
  const salesSummary = useSalesSummaryByProduct(displayedOrders, productPrefix);

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">รายงานยอดขาย</h1>
      <DateFilterToolbar
        tempDate={tempDate}
        setTempDate={setTempDate}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        setCurrentPage={setCurrentPage}
        dateRange={dateRange}
        setDateRange={setDateRange}
        productPrefix={productPrefix}
        setProductPrefix={setProductPrefix}
      />
      <SalesSummaryTable salesSummary={salesSummary} />
    </div>
  );
}
