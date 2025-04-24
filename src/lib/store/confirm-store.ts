// lib/store/confirm-store.ts
import { create } from "zustand";

type ConfirmStore = {
  isOpen: boolean;
  message: string;
  onConfirm: (() => void) | null;
  onCancel: (() => void) | null;
  open: (message: string, onConfirm: () => void, onCancel?: () => void) => void;
  close: () => void;
};

export const useConfirmStore = create<ConfirmStore>((set) => ({
  isOpen: false,
  message: "",
  onConfirm: null,
  onCancel: null,
  open: (message, onConfirm, onCancel) =>
    set({ isOpen: true, message, onConfirm, onCancel }),
  close: () =>
    set({ isOpen: false, message: "", onConfirm: null, onCancel: null }),
}));
