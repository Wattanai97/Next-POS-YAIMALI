// Confirm-Store ใช้กับ Custom Confirm Dialog
import { create } from "zustand";
import { ConfirmStoreType } from "@/app/types/zustand/dialog/confirm-store-type";

export const useConfirmStore = create<ConfirmStoreType>((set) => ({
  isOpen: false,
  message: "",
  onConfirm: null,
  onCancel: null,
  open: (message, onConfirm, onCancel) =>
    set({ isOpen: true, message, onConfirm, onCancel }),
  close: () =>
    set({ isOpen: false, message: "", onConfirm: null, onCancel: null }),
}));
