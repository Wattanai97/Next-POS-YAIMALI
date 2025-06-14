import { NextRequest, NextResponse } from "next/server";
import { sendNotification } from "@/lib/sendNotifierReport/sendNotification";
import { generateDailyReport } from "@/lib/genarateDailyReport/generateDailyReport."; // ฟังก์ชันรวมยอดที่เคยทำไว้

export async function GET(req: NextRequest) {
  const auth = req.headers.get("Authorization");
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const message = await generateDailyReport(); // ดึงข้อความรายงาน
  await sendNotification(message);
  
  return NextResponse.json({ ok: true });
}
