// Api สำหรับบันทึกคำสั่งซื้อ orders ลง database
import { NextRequest, NextResponse } from "next/server";
import { sendNotification } from "@/lib/notify";
import { formatDateNoti } from "@/lib/formatdate-noti";
import { formatDate } from "@/utils/sale-report/format-datetime-salereport";
import Order from "@/models/order";
import { connectDB } from "@/lib/db";

export async function POST(req: NextRequest) {
  console.log(`... เริ่มทำงานที่ Api orderpay ...`);
  console.log(`... กำลังเชื่อมต่อฐานข้อมูล ...`);
  await connectDB();
  console.log(`... เชื่อมต่อฐานข้อมูลสำเร็จ ...`);

  const body = await req.json();

  const { items, total, status } = body;

  if (
    !Array.isArray(items) ||
    items.length === 0 ||
    typeof total !== "number" ||
    !status
  ) {
    return NextResponse.json({ error: "Invalid order data" }, { status: 400 });
  }

  try {
    const order = new Order({ items, total, status });
    await order.save();
    await sendNotification(`🧾 มีคำสั่งซื้อใหม่ :
- รายการ: ${items.length} รายการ
- ลูกค้า: ${order.customerCount} คน
${items
  .map(
    (item: any, i: number) =>
      `  ${i + 1}. ${item.product} (${item.quantity} x ${item.price}฿)`
  )
  .join("\n")}
- ยอดรวม: ${total} บาท
- สถานะ: ${status}
- เวลาทำรายการ : ${formatDateNoti(order.createdAt)}
`);
    console.log(`... จบการทำงานที่ Api orderspay ...`);

    return NextResponse.json(
      { message: "Order created", num: order.num },
      { status: 201 }
    );
  } catch (error) {
    console.error("❌ Order creation error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
