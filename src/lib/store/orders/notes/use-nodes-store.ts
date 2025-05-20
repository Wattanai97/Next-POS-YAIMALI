// lib/store/useNotesStore.ts
import { create } from "zustand";
import { saveSelected_ItemToLocalState } from "@/hooks/forNotesStore/save-selecteditems";
import { handleCheckboxChange } from "@/hooks/forNotesStore/checkbox-chance";

export interface SelectedItemType {
  _id: string;
  title: string;
  detail: string;
  quantity: number;
}

export interface useNodesStoreType {
  checkboxLabels: string[];
  detail: string;
  quantity: number;
  selectedItems: SelectedItemType[];
  handleCheckboxChange: (label: string, checked: boolean) => void;
  setDetail: (text: string) => void;
  incrementQuantity: () => void;
  decrementQuantity: () => void;
  saveSelectedItemToLocalState: () => void;
  clearSelection: () => void;
  setSelectedItems: (items: SelectedItemType[]) => void;
}

export const useNodesStore = create<useNodesStoreType>((set, get) => ({
  checkboxLabels: [],
  detail: "",
  quantity: 1,
  selectedItems: [],
  handleCheckboxChange: handleCheckboxChange(set),
  setDetail: (text) => set({ detail: text }),
  incrementQuantity: () => set((state) => ({ quantity: state.quantity + 1 })),
  decrementQuantity: () =>
    set((state) => ({ quantity: Math.max(1, state.quantity - 1) })),
  saveSelectedItemToLocalState: saveSelected_ItemToLocalState(get, set),
  clearSelection: () => set({ checkboxLabels: [], detail: "", quantity: 1 }),
  setSelectedItems: (items) => set({ selectedItems: items }),
}));
