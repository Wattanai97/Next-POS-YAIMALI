import { NextRequest, NextResponse } from "next/server";
import Order from "@/models/order";
import { connectDB } from "@/lib/db";

export async function PUT(req: NextRequest) {
  await connectDB();
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
      { num },
      { status: "paid", items, total },
      { new: true }
    );
    if (!updated) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }
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
