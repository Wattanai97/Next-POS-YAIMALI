import { connectDB } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import Order from "@/models/order";

export async function POST(req: NextRequest) {
  console.log(`เริ่มต้นทำงานที่ Api sale-by-category...`);
  try {
    console.log(`กำลังเชื่อมต่อ Database...`);
    await connectDB();
    console.log(`เชื่อมต่อ Database สำเร็จ`);
    const orderbycategory = Order.find
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
      return NextResponse.json({ message: error.message });
    }
  }
}
