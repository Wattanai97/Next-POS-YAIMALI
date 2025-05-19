// lib/store/useNotesStore.ts
import { create } from "zustand";
import { v4 as uuid } from "uuid";
export interface SelectedItemType {
  _id: string;
  title: string;
  detail: string;
  quantity: number;
}

interface useNodesStoreType {
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

  handleCheckboxChange: (label, checked) => {
    set((state) => ({
      checkboxLabels: checked
        ? [...state.checkboxLabels, label]
        : state.checkboxLabels.filter((item) => item !== label),
    }));
  },

  setDetail: (text) => set({ detail: text }),

  incrementQuantity: () => set((state) => ({ quantity: state.quantity + 1 })),

  decrementQuantity: () =>
    set((state) => ({ quantity: Math.max(1, state.quantity - 1) })),

  saveSelectedItemToLocalState: () => {
    const { checkboxLabels, detail, quantity } = get();
    const title = checkboxLabels.join(", ");
    const GenarateId = uuid();
    const newItem: SelectedItemType = {
      _id: GenarateId,
      title,
      detail,
      quantity,
    };
    set((state) => ({
      selectedItems: [...state.selectedItems, newItem],
      checkboxLabels: [],
      detail: "",
      quantity: 1,
    }));
  },
  clearSelection: () => set({ checkboxLabels: [], detail: "", quantity: 1 }),
  setSelectedItems: (items) => set({ selectedItems: items }),
}));
