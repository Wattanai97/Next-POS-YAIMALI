import { create } from "zustand";

interface ConfirmStore {
  isOpen: boolean;
  message: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  open: (message: string) => void;
  close: () => void;
  opennotes: (message: string, onConfirm: () => void) => void;
}

export const useNotesConfirmStore = create<ConfirmStore>((set) => ({
  isOpen: false,
  message: "",
  onConfirm: undefined,
  onCancel: undefined,
  open: (message) => set({ isOpen: true, message }),
  close: () =>
    set({
      isOpen: false,
      message: "",
      onConfirm: undefined,
      onCancel: undefined,
    }),
  opennotes: (message, onConfirm) => set({ isOpen: true, message, onConfirm }),
}));
