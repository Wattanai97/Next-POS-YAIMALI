// Confirm-Store ใช้กับ Custom Confirm Dialog
//
import { create } from "zustand";

type ConfirmStore = {
  isOpen: boolean;
  message: string;
  onConfirm: (() => void) | null;
  onCancel: (() => void) | null;
  open: (message: string, onConfirm: () => void, onCancel?: () => void) => void;
  close: () => void;
};

export const useItemsNodesConfirmStore = create<ConfirmStore>((set) => ({
  isOpen: false,
  message: "",
  onConfirm: null,
  onCancel: null,
  open: (message, onConfirm, onCancel) =>
    set({ isOpen: true, message, onConfirm, onCancel }),
  close: () =>
    set({ isOpen: false, message: "", onConfirm: null, onCancel: null }),
}));
