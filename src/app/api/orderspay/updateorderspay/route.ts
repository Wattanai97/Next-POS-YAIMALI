import { NextRequest, NextResponse } from "next/server";
import Order from "@/models/order";
import { connectDB } from "@/lib/db";

export async function PUT(req: NextRequest) {
  console.log(`... เริ่มต้นทำงานที่ Api updateorderspay ...`);
  console.log(`... กำลังเชื่อมต่อ Database ...`);
  await connectDB();
  console.log(`... เชื่อมต่อ Database สำเร็จ ...`);
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
    const updated = await Order.findOneAndUpdate(
      { num, status: "hold" },
      { status: "paid", items, total },
      { new: true, upsert: false }
    );
    if (!updated) {
      console.log(`ไม่เจอออเดอร์ดังกล่าว orderNumBer = ${num}`);
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }
    console.log(`... จบการทำงานที่ Api updateorderspay ...`);
    return NextResponse.json(
      { message: "Order updated", order: updated },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Order update error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
