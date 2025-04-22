import { useOrderCartStore } from "@/lib/store/useOrderCartStore";

const handleCheckout = async () => {
  const { holdMode, holdOrderNum, hanlerBuy, updateOrder } =
    useOrderCartStore();
  if (holdMode && holdOrderNum !== null) {
    await updateOrder(holdOrderNum);
  } else {
    await hanlerBuy();
  }
};
