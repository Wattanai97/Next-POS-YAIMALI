"use client";
import "react-datepicker/dist/react-datepicker.css";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSalesByProductPagination } from "@/hooks/forSaleReports/forSaleByProduct/sales-by-product";
import DateFilterToolbar from "@/components/sale-report/sales-by-product/sales-by-product-date-filter";

export default function SalesByProductReport() {
  const {
    tempDate,
    setTempDate,
    tempRange,
    setTempRange,
    tempCategory,
    setTempCategory,
    handleConfirm,
    selectedDate,
    dateRange,
    category_Product,
    filteredItems,
    startDate,
    endDate,
  } = useSalesByProductPagination();

  const summaryByProduct: Record<string, { quantity: number; total: number }> =
    {};

  filteredItems.forEach((item) => {
    if (!summaryByProduct[item.product]) {
      summaryByProduct[item.product] = {
        quantity: item.quantity,
        total: item.quantity * item.price,
      };
    } else {
      summaryByProduct[item.product].quantity += item.quantity;
      summaryByProduct[item.product].total += item.quantity * item.price;
    }
  });

  const totalQty = Object.values(summaryByProduct).reduce(
    (sum, i) => sum + i.quantity,
    0
  );
  const totalAmount = Object.values(summaryByProduct).reduce(
    (sum, i) => sum + i.total,
    0
  );

  const isConfirmed = selectedDate !== null && dateRange !== "all";

  return (
    <div className="p-5 max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>📊 รายงานยอดขายเฉพาะหมวดหมู่</CardTitle>
        </CardHeader>
        <CardContent>
          <DateFilterToolbar
            tempDate={tempDate}
            setTempDate={setTempDate}
            tempRange={tempRange}
            setTempRange={setTempRange}
            tempCategory={tempCategory}
            setTempCategory={setTempCategory}
            onConfirm={handleConfirm}
          />

          {!isConfirmed ? (
            <div className="text-center text-gray-500 mt-4">
              🔎 กรุณาเลือกช่วงวันที่และหมวดหมู่ แล้วกด "✅ ยืนยันช่วง"
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="text-center text-gray-500 mt-4">
              ❌ ไม่มีสินค้าตรงกับช่วงเวลาหรือหมวดหมู่ที่เลือก ❌
            </div>
          ) : (
            <>
              <div className="bg-gray-100 dark:text-slate-950 p-4 rounded-lg text-center font-semibold text-lg">
                📦 ยอดขาย : {category_Product} : 💰 ฿
                {totalAmount.toLocaleString()} | 🧮 {totalQty} รายการ
              </div>

              <Card className="mt-4">
                <CardContent>
                  <ul className="space-y-1">
                    {/* ✅ แสดงช่วงเวลาที่เลือก */}
                    {startDate && endDate && (
                      <div className="text-center text-lg font-bold dark:text-slate-50 text-zinc-900 my-2">
                        {dateRange === "daily" ? (
                          <>
                            <p>ยอดขายเมนู {category_Product}</p>

                            <p>วันที่ {endDate.toLocaleDateString("th-TH")}</p>
                          </>
                        ) : (
                          <>
                            <p>
                              ยอดขายเมนู {category_Product} ระหว่างช่วงวันที่
                            </p>
                            <p>
                              {startDate.toLocaleDateString("th-TH")} -
                              {endDate.toLocaleDateString("th-TH")}
                            </p>
                          </>
                        )}
                      </div>
                    )}
                    {Object.entries(summaryByProduct).map(
                      ([product, data], index) => (
                        <li key={index}>
                          🍜 {product} ( x{data.quantity} ) - ฿
                          {data.total.toLocaleString()}
                        </li>
                      )
                    )}
                  </ul>
                  <p className="mt-2 font-semibold">
                    📊 รวมทั้งหมด: {totalQty} รายการ | 💰 ฿
                    {totalAmount.toLocaleString()}
                  </p>
                </CardContent>
              </Card>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
