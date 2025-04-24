import { create } from "zustand";

export type FilterType = "All" | "Foods" | "Drinks";

interface FilterTypeStore {
  filterType: FilterType;
  setFilterType: (type: FilterType) => void;
}

export const useFilterProductByType = create<FilterTypeStore>((set) => ({
  filterType: "All",
  setFilterType: (type: FilterType) => set({ filterType: type }),
}));
