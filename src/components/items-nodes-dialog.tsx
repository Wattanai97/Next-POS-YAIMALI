"use client";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useLoadingStore } from "@/lib/store/useloding-errormessage";
import AuthLoading from "./auth-loading";
import ErrorMessage from "./error-message";
import { useItemsNodesConfirmStore } from "@/lib/store/itesmnodes-confirm-store";

import SelectedItemsList from "./selected-items-list";
export function ItemsNotesDialog() {
  const { isLoading, error } = useLoadingStore();
  const { isOpen, close, message } = useItemsNodesConfirmStore();

  const handleCancel = () => {
    close(); // ✅ ปิด Dialog
  };

  return (
    <div>
      {isLoading ? (
        <AuthLoading />
      ) : (
        <Dialog open={isOpen} onOpenChange={close}>
          <DialogContent className="max-h-screen overflow-auto">
            <DialogTitle>รายละเอียดออเดอร์ที่บันทึก</DialogTitle>
            <div className="text-center space-y-4">
              <p className="text-lg">{message}</p>
              <SelectedItemsList />
              <div className="flex justify-center my-3 space-x-4 pt-2">
                <Button variant="outline" onClick={handleCancel}>
                  ปิด
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
      {error && <ErrorMessage error={error} />}
    </div>
  );
}
