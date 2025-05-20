// lib/store/holdOrderStore.ts
import { create } from "zustand";
import { HoldOrderStoreFlyinWindowType } from "@/app/types/zustand/orders/use-order-holdorder-store-type";

export const useHoldOrderStore = create<HoldOrderStoreFlyinWindowType>(
  (set) => ({
    isVisible: false,
    isAnimatingOut: false,

    openHold: () => set({ isVisible: true }),
    closeHold: () => set({ isAnimatingOut: true }),

    finishAnimation: () =>
      set((state) => ({
        isVisible: state.isAnimatingOut ? false : state.isVisible,
        isAnimatingOut: false,
      })),
  })
);
