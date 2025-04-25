// src/app/api/orderspay/route.ts
import { NextRequest, NextResponse } from "next/server";
import Order from "@/models/order";
import { connectDB } from "@/lib/db";

export async function POST(req: NextRequest) {
  await connectDB();
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
