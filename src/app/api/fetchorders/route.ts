import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Order from "@/models/order";

export async function GET() {
  try {
    console.log("⏳ เริ่มทำงานที่ API fetchorders");

    // เชื่อมต่อฐานข้อมูล
    await connectDB();

    // ดึงข้อมูลคำสั่งซื้อ
    const orders = await Order.find({});
    if (!orders.length) {
      return new NextResponse(JSON.stringify({ message: "No orders found!" }), {
        status: 404,
        headers: corsHeaders,
      });
    }

    return new NextResponse(
      JSON.stringify({ message: "Get Orders Success", orders }),
      { status: 200, headers: corsHeaders }
    );
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({
        message: "Internal Server Error",
        error: error.message,
      }),
      { status: 500, headers: corsHeaders }
    );
  }
}

// CORS Headers
const corsHeaders = {
  "Access-Control-Allow-Origin": "*", // หรือใส่เป็นโดเมนของคุณ
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

// Handle OPTIONS request
export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders });
}
