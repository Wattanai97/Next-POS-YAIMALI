import { NextResponse, NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import Order from "@/models/order";
import { statusType } from "@/models/order";
export async function GET(req: NextRequest) {
  try {
    console.log("⏳ เริ่มทำงานที่ API fetchHoldOrders");
    // เชื่อมต่อฐานข้อมูล
    await connectDB();
    // ดึงข้อมูลคำสั่งซื้อที่พักไว้
    const orders = await Order.find({ status: statusType.HOLD });
    if (!orders.length) {
      return new NextResponse(
        JSON.stringify({ message: "No hold orders found!", orders: [] }),
        {
          status: 200,
          headers: corsHeaders,
        }
      );
    }
    console.log(
      `Get Order Success in API fetchHoldorders ! find : ${orders.length} Hold orders`
    );
    console.log(`⏳ จบการทำงานที่ API fetchHoldorders`);
    return new NextResponse(
      JSON.stringify({ message: "Get OrdersHold Success", orders }),
      { status: 200, headers: corsHeaders }
    );
  } catch (error) {
    if (error instanceof Error) {
      return new NextResponse(
        JSON.stringify({
          message: "Internal Server Error",
          error: error.message,
        }),
        { status: 500, headers: corsHeaders }
      );
    }
    return new NextResponse(JSON.stringify({ message: "Unknown Error" }), {
      status: 500,
      headers: corsHeaders,
    });
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
