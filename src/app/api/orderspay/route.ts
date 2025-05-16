// Api สำหรับบันทึกคำสั่งซื้อ orders ลง database
import { NextRequest, NextResponse } from "next/server";
import Order from "@/models/order"; // Import Model Order
import { connectDB } from "@/lib/db"; // Import Connect Database
// export function Method POST รับ req Type NextRequest
export async function POST(req: NextRequest) {
  console.log(`... เริ่มทำงานที่ Api orderpay ...`);
  console.log(`... กำลังเชื่อมต่อฐานข้อมูล ...`);
  await connectDB();
  console.log(`... เชื่อมต่อฐานข้อมูลสำเร็จ ...`);

  const body = await req.json(); // สร้างตัวแปร body รับ await req.json() ใช้ await รับ req มาแล้วแปลงเป็น jsonObject
  const { items, total, status } = body; // destructuring items,total,status (เป็นค่าที่ส่งมากจา req) จากตัวแปร body
  // เช็ค validate ข้อมูลก่อนบันทึกลง Database
  if (
    !Array.isArray(items) || // ถ้า items ไม่ใช่ array หรือว่างเปล่า
    items.length === 0 ||
    typeof total !== "number" || // หรือ total ไม่ใช่ number
    !status // หรือไม่มีค่า status
  ) {
    return NextResponse.json({ error: "Invalid order data" }, { status: 400 }); // return block นี้หากเข้าเงื่อนไขด้านบน
  }
  // ใช้ Try Catch เพื่อดักจับ Error
  try {
    const order = new Order({ items, total, status }); // สร้างตัวแปร order ใช้ new Order ให้โครงสร้างข้อมูลเป็นรูปแบบเดียวกับ Model และส่ง 3 ค่าใน Object เข้าไป
    await order.save(); // ใช้ method save เพื่อบันทึก order ลง Database
    console.log(`... จบการทำงานที่ Api orderspay ...`);
    // หลังบันทึกเสร็จ Return NextResponse.json message,status และ num:order.num
    return NextResponse.json(
      { message: "Order created", num: order.num },
      { status: 201 }
    );
  } catch (error) {
    // หาก Catch error มาก็จะให้ Return Error
    console.error("❌ Order creation error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
