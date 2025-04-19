// stores/useOrderPaginationStore.ts
import { create } from "zustand";

interface OrderPaginationState {
  currentPage: number;
  setPage: (page: number) => void;
  itemsPerPage: number;
}

export const useOrderCardViewPaginationStore = create<OrderPaginationState>((set) => ({
  currentPage: 1,
  itemsPerPage: 4,
  setPage: (page) => set({ currentPage: page }),
}));

export const useOrderTableViewPaginationStore = create<OrderPaginationState>((set) => ({
  currentPage: 1,
  itemsPerPage: 10,
  setPage: (page) => set({ currentPage: page }),
}));
