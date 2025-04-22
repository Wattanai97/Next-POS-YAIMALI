// lib/store/holdOrderStore.ts
import { create } from "zustand";

type HoldOrderStore = {
  isVisible: boolean;
  isAnimatingOut: boolean;
  openHold: () => void;
  closeHold: () => void;
  finishAnimation: () => void;
};

export const useHoldOrderStore = create<HoldOrderStore>((set) => ({
  isVisible: false,
  isAnimatingOut: false,

  openHold: () => set({ isVisible: true }),
  closeHold: () => set({ isAnimatingOut: true }),

  finishAnimation: () =>
    set((state) => ({
      isVisible: state.isAnimatingOut ? false : state.isVisible,
      isAnimatingOut: false,
    })),
}));
