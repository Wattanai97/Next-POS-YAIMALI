import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Order from "@/models/order";

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
