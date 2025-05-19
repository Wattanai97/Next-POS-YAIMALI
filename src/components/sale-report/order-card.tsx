import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatDate, formatTime } from "@/utils/sale-report/format-datetime-salereport";

type OrderItem = {
  product: string;
  price: number;
  quantity: number;
};

export type Order = {
  num: number;
  createdAt: string;
  total: number;
  customerCount: number;
  items: OrderItem[];
};

type Props = {
  order: Order | null;
  isExpanded: boolean;
  toggleDetails: (num: number) => void;
};

export default function OrderCard({ order, isExpanded, toggleDetails }: Props) {
  // ตรวจสอบว่า order มีค่าอยู่จริงหรือไม่
  if (!order) {
    return (
      <Card className="mt-4">
        <CardContent>
          <p className="text-center text-gray-500">ไม่มีข้อมูลออเดอร์</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mt-4">
      <CardContent>
        <p>📅 วันที่: {formatDate(new Date(order.createdAt))}</p>
        <p>⏰ เวลา: {formatTime(new Date(order.createdAt))}</p>
        <p>🛒 ออเดอร์ที่ {order.num}</p>
        <p>💰 ยอดรวม: ฿{order.total}</p>
        <p>👥 ลูกค้า: {order.customerCount} คน</p>
        <Button
          className="mt-2"
          variant="outline"
          size="sm"
          onClick={() => toggleDetails(order.num)}
        >
          {isExpanded ? "🔽 ซ่อนรายละเอียด" : "🔍 ดูรายละเอียด"}
        </Button>
        {isExpanded && (
          <div className="mt-3 border-t pt-2">
            <p className="font-semibold">📦 รายการสินค้า:</p>
            <ul className="mt-2">
              {order.items.map((item, index) => (
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
