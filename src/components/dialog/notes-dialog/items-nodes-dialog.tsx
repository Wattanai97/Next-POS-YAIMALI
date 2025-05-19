"use client";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useLoadingStore } from "@/lib/store/useloding-errormessage";
import AuthLoading from "../../loading-error/auth-loading";
import ErrorMessage from "../../loading-error/error-message";
import { useItemsNodesConfirmStore } from "@/lib/store/dialog/itesmnodes-confirm-store";

import SelectedItemsList from "../../notes/selected-items-list";
export function ItemsNotesDialog() {
  const { isLoading, error } = useLoadingStore();
  const { isOpen, close, message } = useItemsNodesConfirmStore();

  const handleCancel = () => {
    close(); // ✅ ปิด Dialog
  };

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={close}>
        <DialogContent className="max-h-screen overflow-auto">
          <DialogTitle>รายละเอียดออเดอร์ที่บันทึก</DialogTitle>
          {isLoading ? (
            <AuthLoading />
          ) : (
            <div className="text-center space-y-4">
              <p className="text-lg">{message}</p>
              <SelectedItemsList />
              <div className="flex justify-center my-3 space-x-4 pt-2">
                <Button variant="outline" onClick={handleCancel}>
                  ปิด
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
