import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "@/components/ui/button";

type Props = {
  tempDate: Date | null;
  setTempDate: (date: Date | null) => void;
  setSelectedDate: (date: Date | null) => void;
  setCurrentPage: (page: number) => void;
};

export default function DateFilterToolbar({
  tempDate,
  setTempDate,
  setSelectedDate,
  setCurrentPage,
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
        <Button
          onClick={() => {
            setSelectedDate(tempDate);
            setCurrentPage(1);
          }}
        >
          ✅ ยืนยันวันที่
        </Button>
      </div>
      <Button
        variant="outline"
        onClick={() => {
          setSelectedDate(null);
          setTempDate(null);
          setCurrentPage(1);
        }}
      >
        📅 ดูทุกรายการ
      </Button>
    </div>
  );
}
