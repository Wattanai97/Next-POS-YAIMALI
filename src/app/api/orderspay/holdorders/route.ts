import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Order from "@/models/order";
import { sendNotification } from "@/lib/notify";
import { ItemType } from "../route";
export async function PUT(req: NextRequest) {
  console.log(`เริ่มต้นทำงานที่ Api holdorders...`);
  await connectDB();
  console.log(`เชื่อมต่อ Database สำเร็จ...`);
  const body = await req.json();
  const { num, items, total } = body;
  if (
    typeof num !== "number" ||
    !Array.isArray(items) ||
    items.length === 0 ||
    typeof total !== "number"
  ) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }
  try {
    const holdorderUpdate = await Order.findOneAndUpdate(
      { num, status: "hold" },
      { status: "hold", items, total },
      { new: true, upsert: false }
    );
    await sendNotification(`🧾 มีคำสั่งซื้อใหม่ :
    - รายการ: ${items.length} รายการ
    - สถานะรายการ = พักออเดอร์ : ยังไม่คิดเงิน
    ${items
      .map(
        (item: ItemType, i: number) =>
          `  ${i + 1}. ${item.product} (${item.quantity} x ${item.price}฿)`
      )
      .join("\n")}
    - ยอดรวม: ${total} บาท
    - สถานะ: "hold" 
    `);
    if (!holdorderUpdate) {
      console.log(`can't not find OrderNum = ${num}`);
      return NextResponse.json(
        { message: `ไม่เจอออเดอร์นัมเบอร์ดังกล่าว` },
        { status: 400 }
      );
    }
    console.log(`เพิ่มรายการเข้าตะกร้าและพักออเดอร์สำเร็จ`);
    return NextResponse.json(
      { num: holdorderUpdate.num, order: holdorderUpdate },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error) {
      console.log(`Catch Message => ${error.message}`);
      return NextResponse.json(
        { error: "Error internal server." },
        { status: 500 }
      );
    }
  }
}
