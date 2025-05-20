import { create } from "zustand";
import { NotesConfirmStoreType } from "@/app/types/zustand/dialog/confirm-store-type";

export const useNotesConfirmStore = create<NotesConfirmStoreType>((set) => ({
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
