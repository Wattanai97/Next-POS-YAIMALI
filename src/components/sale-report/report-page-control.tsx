import { Button } from "@/components/ui/button";

type Props = {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (p: number) => void;
};

export default function PaginationControls({
  currentPage,
  totalPages,
  setCurrentPage,
}: Props) {
  return (
    <div className="flex justify-center mt-4 space-x-2">
      <Button
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(currentPage - 1)}
      >
        ⬅️ ก่อนหน้า
      </Button>
      <span className="px-4 py-2 font-semibold">
        หน้า {currentPage} / {totalPages}
      </span>
      <Button
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage(currentPage + 1)}
      >
        ถัดไป ➡️
      </Button>
    </div>
  );
}
