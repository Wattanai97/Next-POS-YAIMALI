import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "@/components/ui/button";
import { DateRangeType } from "@/hooks/forSaleReports/use-report-pagination";

type Props = {
  tempDate: Date | null;
  setTempDate: (date: Date | null) => void;
  selectedDate: Date | null; // ✅ เพิ่มบรรทัดนี้
  setSelectedDate: (date: Date | null) => void;
  setCurrentPage: (page: number) => void;
  dateRange: DateRangeType;
  setDateRange: (range: DateRangeType) => void;
  productPrefix: string;
  setProductPrefix: (category: string) => void;
};

export default function DateFilterToolbar({
  tempDate,
  setTempDate,
  setSelectedDate,
  setCurrentPage,
  dateRange,
  setDateRange,
  productPrefix,
  setProductPrefix,
}: Props) {
  return (
    <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
      <div className="flex flex-col md:flex-row md:items-center gap-2">
        <label className="font-semibold">เลือกวันที่: </label>
        <DatePicker
          selected={tempDate}
          onChange={(date) => setTempDate(date)}
          dateFormat="dd/MM/yyyy"
          className="border p-2 rounded w-full md:w-auto"
        />
        <select
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value as DateRangeType)}
          className="border p-2 rounded"
        >
          <option value="daily">📅 รายวัน</option>
          <option value="weekly">📆 7 วันย้อนหลัง</option>
          <option value="monthly">🗓 30 วันย้อนหลัง</option>
          <option value="all">🌐 ดูทั้งหมด</option>
        </select>

        <select
          value={productPrefix}
          onChange={(e) => setProductPrefix(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">ทั้งหมด</option>
          <option value="ก๋วยเตี๋ยว">ก๋วยเตี๋ยว</option>
          <option value="เครื่องดื่ม">เครื่องดื่ม</option>
          {/* เพิ่ม category ตามที่มีในข้อมูลจริง */}
        </select>

        <Button
          onClick={() => {
            setSelectedDate(tempDate);
            setCurrentPage(1);
          }}
        >
          ✅ ยืนยันช่วง
        </Button>
      </div>
      <Button
        variant="outline"
        onClick={() => {
          setSelectedDate(null);
          setTempDate(null);
          setDateRange("all");
          setProductPrefix("");
          setCurrentPage(1);
        }}
      >
        🔄 รีเซต
      </Button>
    </div>
  );
}
