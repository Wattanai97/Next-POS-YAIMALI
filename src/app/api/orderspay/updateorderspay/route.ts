import { NextRequest, NextResponse } from "next/server";
import Order from "@/models/order";
import { connectDB } from "@/lib/db";
// Export async function Method PUT สำหรับอัพเดทข้อมูลทั้งหมดใน Collection
export async function PUT(req: NextRequest) {
  console.log(`... เริ่มต้นทำงานที่ Api updateorderspay ...`);
  console.log(`... กำลังเชื่อมต่อ Database ...`);
  await connectDB();
  console.log(`... เชื่อมต่อ Database สำเร็จ ...`);
  const body = await req.json(); // สร้างตัวแปร body รับข้อมูลที่ได้จาก req แล้วแปลงเป็น json
  const { num, items, total } = body; // destructuring num,items,total มาจาก body ที่แปลง req เป็น jsonObject แล้วอีกทีนึง
  // เช็ค validate ข้อมูลที่รับมาก่อน อัพเดทแก้ไขข้อมูล
  if (
    typeof num !== "number" || // ถ้า num ไม่ใช่ Type number
    !Array.isArray(items) || //  เช็คว่า items ใช่ Array หรือเปล่า
    items.length === 0 || // เช็คว่า items มี ข้อมูลด้านในไหม ถ้าเป็น Array ต้องมี มากกว่า 1
    typeof total !== "number" // เช็ค total ว่ามี Type เป็น number หรือเปล่า
  ) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 }); // ถ้าเช็คแล้วเข้าเงื่อนไขด้านบน Return Block นี้
  }
  // Try Catch ดักจับ Error
  try {
    // สร้างตัวแปร updated ใช้ Method findOneAndUpdate() โดยค้นหาออเดอร์ที่จะอัพเดทผ่านตัว num ที่รับมาจาก Request หรือ number ของ order ที่จะอัพเดท
    const updated = await Order.findOneAndUpdate(
      { num },
      { status: "paid", items, total }, // อัพ status เป็น paid และ อัพเดท items,total ตามตัวแปรที่ Destructuring มาจาก Request เลย
      { new: true }
    );
    // เช็คหากว่า updated finOneAndUpdate แล้วไม่เจอข้อมูลตาม num ที่ส่งเข้าไป
    if (!updated) {
      console.log(`ไม่เจอออเดอร์ดังกล่าว orderNumBer = ${num}`);
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }
    console.log(`... จบการทำงานที่ Api updateorderspay ...`);
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
