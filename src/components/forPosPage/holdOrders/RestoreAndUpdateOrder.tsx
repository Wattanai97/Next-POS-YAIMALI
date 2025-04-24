import { useOrderCartStore } from "@/lib/store/useOrderCartStore";
import { HoldCheckoutButton } from "./HoldCheckoutButton";

type HoldOrderCardProps = {
  orderNum: number;
  items: {
    productId:string,
    product: string;
    quantity: number;
    price: number;
    category: string;
  }[];
};
export const RestoreAndUpdate = ({ orderNum, items }: HoldOrderCardProps) => {
  const handleRestoreToCart = () => {
    const restoredCart = items.map((item) => ({
      product: {
        productId: item.productId,
        name: item.product,
        price: item.price,
        category: item.category as "All" | "Foods" | "Drinks",
      },
      quantity: item.quantity,
    }));

    useOrderCartStore.setState({
      cart: restoredCart, // 👈 set แบบตรง ๆ ไม่ต้องไป merge กับของเดิมที่ถูก clear แล้ว
      holdMode: true,
      holdOrderNum: orderNum,
    });

    alert("นำรายการกลับมาตะกร้าแล้ว!");
  };

  return <HoldCheckoutButton onRestore={handleRestoreToCart} />;
};
