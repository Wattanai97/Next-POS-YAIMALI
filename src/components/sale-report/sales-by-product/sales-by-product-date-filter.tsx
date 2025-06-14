import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "@/components/ui/button";
import { DateRangeType } from "@/hooks/forSaleReports/use-report-pagination";
import CategoryFilterToolbar from "./category-filter-toolbar";
import { CategoryFilterType } from "@/hooks/forSaleReports/forSaleByProduct/sales-by-product";

type Props = {
  tempDate: Date | null;
  setTempDate: (date: Date | null) => void;
  tempRange: DateRangeType;
  setTempRange: (range: DateRangeType) => void;
  tempCategory: CategoryFilterType;
  setTempCategory: (cat: CategoryFilterType) => void;
  onConfirm: () => void;
};

export default function DateFilterToolbar({
  tempDate,
  setTempDate,

  tempRange,
  setTempRange,
  tempCategory,
  setTempCategory,
  onConfirm,
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
          value={tempRange}
          onChange={(e) => setTempRange(e.target.value as DateRangeType)}
          className="border p-2 rounded"
        >
          <option value="daily">📅 รายวัน</option>
          <option value="weekly">📆 7 วันย้อนหลัง</option>
          <option value="monthly">🗓 30 วันย้อนหลัง</option>
          <option value="all">🌐 ดูทั้งหมด</option>
        </select>
        <CategoryFilterToolbar
          tempCategory={tempCategory}
          setTempCategory={setTempCategory}
        />
        <Button
          onClick={() => {
            onConfirm();
          }}
        >
          ✅ ยืนยันช่วง
        </Button>
      </div>
      <Button
        variant="outline"
        onClick={() => {
          setTempDate(null);
          setTempRange("all");
          setTempCategory("ทั้งหมด");

          onConfirm();
        }}
      >
        🔄 รีเซต
      </Button>
    </div>
  );
}
