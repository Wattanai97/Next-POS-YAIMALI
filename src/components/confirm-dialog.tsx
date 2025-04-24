// components/ui/ConfirmDialog.tsx
"use client";
import { useConfirmStore } from "@/lib/store/confirm-store";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export const ConfirmDialog = () => {
  const { isOpen, message, onConfirm, onCancel, close } = useConfirmStore();

  const handleConfirm = () => {
    onConfirm?.();
    close();
  };

  const handleCancel = () => {
    onCancel?.();
    close();
  };

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent>
        <DialogTitle>ยืนยันการขาย</DialogTitle>
        <DialogHeader>{message}</DialogHeader>
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={handleCancel}>
            ยกเลิก
          </Button>
          <Button onClick={handleConfirm}>ยืนยัน</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
