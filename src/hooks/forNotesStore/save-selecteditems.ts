import { useNodesStoreType } from "@/lib/store/orders/notes/use-nodes-store";
import { SelectedItemType } from "@/lib/store/orders/notes/use-nodes-store";
import { v4 as uuid } from "uuid";
// ฟังก์ชันนี้จะ return function ที่ใช้ใน store
import { StateCreator } from "zustand";

export const saveSelected_ItemToLocalState = (
  get: () => useNodesStoreType,
  set: Parameters<StateCreator<useNodesStoreType>>[0] // ✅ ใช้ type จาก Zustand โดยตรง
): (() => void) => {
  return () => {
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
  };
};
