import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Order from "@/models/order";
// /api/orders/pay/route.ts
export async function PUT(req: NextRequest) {
  const { num, items, total } = await req.json();
  if (!num || !items) {
    return NextResponse.json({ message: "ข้อมูลไม่ครบ" }, { status: 400 });
  }

  await connectDB();

  const updated = await Order.findOneAndUpdate(
    { num },
    { status: "paid", items, total },
    { new: true }
  );

  if (!updated) {
    return NextResponse.json({ message: "ไม่พบออเดอร์" }, { status: 404 });
  }

  return NextResponse.json({ message: "อัปเดตเรียบร้อย" });
}
