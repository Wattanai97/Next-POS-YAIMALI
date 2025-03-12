import { NextResponse } from "next/server";
import Order from "@/models/order";
import { connectDB } from "@/lib/db";
import mongoose from "mongoose";

export async function POST(req: Request) {
  try {
    await connectDB();
    const { items, total } = await req.json();

    // ตรวจสอบว่ามี items และ total หรือไม่
    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: "Invalid order data" },
        { status: 400 }
      );
    }

    // สร้างคำสั่งซื้อ
    const order = new Order({
      items: items.map((item: { product: string; quantity: number }) => ({
        product: item.product, // ใช้ชื่อสินค้า (string) แทน ObjectId
        quantity: item.quantity,
      })),
      total,
      createdAt: new Date(),
    });

    await order.save();

    return NextResponse.json(
      { message: "Order created!", orderId: order._id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Order creation error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
