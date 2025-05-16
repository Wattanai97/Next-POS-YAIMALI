//API Fetch Order ที่กดพักไว้ (Hold Order) เก็บลง Store Zustand

// Import NextResponse , NextRequest form next/server
import { NextResponse, NextRequest } from "next/server";
// Import ตัวเชื่อมต่อ Database
import { connectDB } from "@/lib/db";
// Import Model Order หรือ Database Collection orders
import Order from "@/models/order";
// Import statusType (enum "hold" , "paid" )
import { statusType } from "@/models/order";
// export function method GET และรับ req Type = NextRequest
export async function GET(req: NextRequest) {
  try {
    // ใช้ Try Catch ดักจับ Error
    console.log("⏳ เริ่มทำงานที่ API fetchHoldOrders");
    // เริ่มเชื่อมต่อฐานข้อมูล
    await connectDB();
    // ดึงข้อมูลคำสั่งซื้อที่พักไว้ผ่าน model Order และใช้ Method find ดึงรายการที่มี status = "hold" มา
    const orders = await Order.find({ status: statusType.HOLD });
    // เช็คถ้าไม่มี orders ที่ status = hold return Nexresponse JSON.stringify message: ... และ return orders: ออกไปเป็น Array เปล่า
    if (!orders.length) {
      return new NextResponse(
        JSON.stringify({ message: "No hold orders found!", orders: [] }),
        {
          status: 200,
          headers: corsHeaders,
        }
      );
    }
    // การทำงานหลังจาก find แล้วมี orders ที่ status = hold
    console.log(
      `Get Order Success in API fetchHoldorders ! find : ${orders.length} Hold orders`
    );
    console.log(`⏳ จบการทำงานที่ API fetchHoldorders`);
    // return NextResponse Json.stringify message: ... และส่ง orders ที่ find ออกไป
    return new NextResponse(
      JSON.stringify({ message: "Get OrdersHold Success", orders }),
      { status: 200, headers: corsHeaders }
    );
  } catch (error) {
    // Catch error หากมีและ return message status และ error message
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
  "Access-Control-Allow-Origin": "*", // เพื่อความปลอดภัยใส่เป็น Domain เพื่อให้ Server รับ Request จาก Domain เท่านั้น ใช้ * ในตอน Dev สามารถยิง Req จากไหนก็ได้
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS", // สามารถให้ส่งรีเควสได้ทั้ง รูปแบบ GET POST OPTIONS Method
  "Access-Control-Allow-Headers": "Content-Type", // อนุญาตให้ header ที่ชื่อว่า Content-Type ถูกส่งมาใน request ได้ (ใช้เวลาส่ง JSON หรือ form data)
};

// Handle OPTIONS request
export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders });
}
