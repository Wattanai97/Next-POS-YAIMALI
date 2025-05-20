import { useNodesStoreType } from "@/lib/store/orders/notes/use-nodes-store";

export const handleCheckboxChange = (
  set: (fn: (state: useNodesStoreType) => Partial<useNodesStoreType>) => void
): ((label: string, checked: boolean) => void) => {
  return (label: string, checked: boolean) => {
    set((state) => ({
      checkboxLabels: checked
        ? [...state.checkboxLabels, label]
        : state.checkboxLabels.filter((item) => item !== label),
    }));
  };
};
