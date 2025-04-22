import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatDate, formatTime } from "./logicsalereport/forMatDate";
type OrderItem = {
  product: string;
  price: number;
  quantity: number;
};

type Order = {
  num: number;
  createdAt: string;
  total: number;
  customerCount: number;
  items: OrderItem[];
};
type Props = {
  holdorders: Order;
  isExpanded: boolean;
  toggleDetails: (num: number) => void;
};

export default function PullHoldOrder({
  holdorders,
  isExpanded,
  toggleDetails,
}: Props) {
  return (
    <Card className="mt-4 p-3">
      <CardContent>
        <p>📅 วันที่: {formatDate(new Date(holdorders.createdAt))}</p>
        <p>⏰ เวลา: {formatTime(new Date(holdorders.createdAt))}</p>
        <p>🛒 ออเดอร์ที่ : {holdorders.num}</p>
        <p>💰 ยอดรวม: ฿{holdorders.total}</p>
        <p>👥 ลูกค้า: {holdorders.customerCount} คน</p>
        <Button
          className="mt-2"
          variant="outline"
          size="sm"
          onClick={() => toggleDetails(holdorders.num)}
        >
          {isExpanded ? "🔽 ซ่อนรายละเอียด" : "🔍 ดูรายละเอียด"}
        </Button>
        {isExpanded && (
          <div className="mt-3 border-t pt-2">
            <p className="font-semibold">📦 รายการสินค้า:</p>
            <ul className="mt-2">
              {holdorders.items.map((item, index) => (
                <li key={index} className="border-b py-1">
                  🍜 {item.product} ({item.quantity}x) - ฿{item.price}
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
      
    </Card>
  );
}
