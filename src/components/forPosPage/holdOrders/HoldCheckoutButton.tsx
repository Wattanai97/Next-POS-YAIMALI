"use client";
import React from "react";
import { Button } from "../../ui/button";
import { RotateCwIcon } from "lucide-react";
import { useHoldOrderStore } from "@/lib/store/useAnimateHoldOrdersWindow";
type HoldOrderActionsProps = {
  onRestore: () => void;
};
export const HoldCheckoutButton = ({ onRestore }: HoldOrderActionsProps) => {
  const { closeHold } = useHoldOrderStore();

  return (
    <div className="flex gap-2 mt-2">
      <Button
        onClick={() => {
          onRestore();
          closeHold();
        }}
        variant="secondary"
        className="flex items-center gap-1"
      >
        <RotateCwIcon className="w-4 h-4" />
        ดึงกลับตะกร้า
      </Button>
    </div>
  );
};
