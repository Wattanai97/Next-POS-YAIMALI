import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "@/components/ui/button";
import { DateRangeType } from "@/hooks/forSaleReports/use-report-pagination";

type Props = {
  tempDate: Date | null;
  setTempDate: (d: Date | null) => void;
  setSelectedDate: (d: Date | null) => void;
  setCurrentPage: (p: number) => void;
  dateRange: DateRangeType;
  setDateRange: (r: DateRangeType) => void;
};

export default function DateFilterToolbar({
  tempDate,
  setTempDate,
  setSelectedDate,
  setCurrentPage,
  dateRange,
  setDateRange,
}: Props) {
  return (
    <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
      <div className="flex items-center gap-2">
        <label className="font-semibold">เลือกวันที่:</label>
        <DatePicker
          selected={tempDate}
          onChange={(d) => setTempDate(d)}
          dateFormat="dd/MM/yyyy"
          className="border p-2 rounded"
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
          setCurrentPage(1);
        }}
      >
        🔄 รีเซต
      </Button>
    </div>
  );
}
