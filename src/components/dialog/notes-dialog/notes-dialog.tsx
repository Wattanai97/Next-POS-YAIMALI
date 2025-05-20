"use client";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useItemsNotesConfirmStore } from "@/lib/store/dialog/itesmnotes-confirm-store";
import NotesCheckboxMenu from "../../notes/notes-checkbox-menu";
import { useNodesStore } from "@/lib/store/orders/notes/use-nodes-store";
import useFetchNodesOrders from "@/hooks/fetchdata/use-fetch-nodes-order";
import { useLoadingStore } from "@/lib/store/useloding-errormessage";
import AuthLoading from "../../loading-error/auth-loading";
import ErrorMessage from "../../loading-error/error-message";
export function NotesDialog() {
  const { error, isLoading, setIsLoading } = useLoadingStore();
  const { fetchNodesOrders } = useFetchNodesOrders();
  const { isOpen, message, close } = useItemsNotesConfirmStore();
  const { checkboxLabels, detail, quantity, clearSelection } = useNodesStore();
  const handleConfirm = async () => {
    setIsLoading(false);
    const API_BASE_URL =
      process.env.NEXT_PUBLIC_API_URL || "https://pos-yaimali.vercel.app";
    const title = checkboxLabels.join(", ");
    try {
      const res = await fetch(`${API_BASE_URL}/api/nodesOrder/addNodesorder`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, detail, quantity }),
      });

      if (res.ok) {
        console.log("✅ บันทึกลง DB สำเร็จ");
        clearSelection();
        await fetchNodesOrders(); // ดึงข้อมูลใหม่มาใส่ selectedItems
        setIsLoading(true);
      }
    } catch (err) {
      console.error("❌ บันทึกไม่สำเร็จ", err);
    }
  };

  const handleCancel = () => {
    clearSelection(); // ✅ รีเซตข้อมูลทุกอย่าง
    close(); // ✅ ปิด Dialog
  };

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={close}>
        <DialogContent className="max-h-screen overflow-auto">
          <DialogTitle>ช่วยจดออเดอร์</DialogTitle>

          {isLoading ? (
            <AuthLoading />
          ) : (
            <div className="text-center space-y-4">
              <p className="text-lg">{message}</p>
              <NotesCheckboxMenu />
              <div className="flex justify-center space-x-4 pt-2">
                <Button variant="outline" onClick={handleCancel}>
                  ยกเลิก
                </Button>
                <Button onClick={handleConfirm}>ยืนยัน</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
