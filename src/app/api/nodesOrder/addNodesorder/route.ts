// app/api/addNotesOrder/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { NotesOrder } from "@/models/nodesorder";

export async function POST(req: NextRequest) {
  try {
    console.log(`เริ่มต้นทำงานที่ Api addnodeorder...`);
    await connectDB();
    console.log(`เชื่อมต่อ Database สำเร็จ...`);
    const { title, detail, quantity } = await req.json();
    console.log(
      `ได้รับข้อมูลมาจาก Clien Title:${title} Detail:${detail} Quantity:${quantity}`
    );
    const order = await NotesOrder.create({ title, detail, quantity });
    console.log(`สร้างและบันทึก NodesOrder สำเร็จ ...`);
    console.log(`จบการทำงานที่ Api addnodesorder...`);
    return NextResponse.json({ success: true, order }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error saving order" },
      { status: 500 }
    );
  }
}
