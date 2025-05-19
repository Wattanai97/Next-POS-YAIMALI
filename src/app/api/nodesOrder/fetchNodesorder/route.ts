import { NextResponse, NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import { NotesOrder } from "@/models/nodesorder";

export async function GET(req: NextRequest) {
  try {
    console.log("⏳ เริ่มทำงานที่ API fetchorders");
    // เชื่อมต่อฐานข้อมูล
    await connectDB();
    // ดึงข้อมูลคำสั่งซื้อ
    const nodesorder = await NotesOrder.find();
    if (!nodesorder.length) {
      return new NextResponse(JSON.stringify({ message: "No orders found!" }), {
        status: 404,
        headers: corsHeaders,
      });
    }
    console.log(
      `Get Order Success in API fetchorders ! find : ${nodesorder.length} orders`
    );
    console.log(`⏳ จบการทำงานที่ API fetchorders`);
    return new NextResponse(
      JSON.stringify({ message: "Get Orders Success", nodesorder }),
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
