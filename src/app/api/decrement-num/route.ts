// app/api/decrement-num/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Order from "@/models/order";

export async function GET() {
  try {
    await connectDB();

    const startNum = 79;

    const result = await Order.updateMany(
      { num: { $gte: startNum } },
      { $inc: { num: -1 } }
    );

    return NextResponse.json({
      message: "Updated via GET",
      modifiedCount: result.modifiedCount,
    });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
