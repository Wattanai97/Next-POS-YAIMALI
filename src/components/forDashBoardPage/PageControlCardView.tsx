import { useOrdersPagination } from "../forDashBoardPage/logic/useOrdersPagination";
import { useOrderStore } from "@/lib/store/useOrdersAndHoldOrders";
import { useOrderCardViewPaginationStore } from "@/lib/store/useOrderPaginationStore";
import { Button } from "../ui/button";

const Pagecontrolcardview = () => {
  const { orders } = useOrderStore();
  const { currentPage, setPage, itemsPerPage } =
    useOrderCardViewPaginationStore(); // ✅ ดึง itemsPerPage
  const { totalPages } = useOrdersPagination(orders, currentPage, itemsPerPage); // ✅ ส่งเข้าไป

  return totalPages > 1 ? (
    <div className="flex justify-center mt-4 space-x-2">
      <Button
        disabled={currentPage === 1}
        onClick={() => setPage(currentPage - 1)}
      >
        ⬅️ ก่อนหน้า
      </Button>
      <span className="px-4 py-2 font-semibold">
        หน้า {currentPage} / {totalPages}
      </span>
      <Button
        disabled={currentPage === totalPages}
        onClick={() => setPage(currentPage + 1)}
      >
        ถัดไป ➡️
      </Button>
    </div>
  ) : null;
};

export default Pagecontrolcardview;
