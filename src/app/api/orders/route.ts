import { NextResponse } from "next/server";
import Order from "@/models/order";
import { connectDB } from "@/lib/db";

export async function POST(req: Request) {
  try {
    await connectDB();
    const { items, total, status } = await req.json();
    // ตรวจสอบว่ามี items และ total หรือไม่
    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: "Invalid order data" },
        { status: 400 }
      );
    }
    // สร้างคำสั่งซื้อ
    const order = new Order({
      items: items.map(
        (item: {
          productId: string;
          product: string;
          quantity: number;
          price: number;
          category: string;
        }) => ({
          productId: item.productId,
          product: item.product, // ใช้ชื่อสินค้า (string) แทน ObjectId
          quantity: item.quantity,
          price: item.price,
          category: item.category,
        })
      ),
      status,
      total,
      createdAt: new Date(),
    });

    await order.save();
    return NextResponse.json({ message: "Order created!" }, { status: 201 });
  } catch (error) {
    console.error("Order creation error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
