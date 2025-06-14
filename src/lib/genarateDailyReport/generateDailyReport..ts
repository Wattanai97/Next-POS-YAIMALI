// lib/report/generateDailyReport.ts
import Order from "@/models/order";
import { connectDB } from "@/lib/db";
import { format } from "date-fns";
import { th } from "date-fns/locale";

export async function generateDailyReport() {
  await connectDB();

  const today = new Date();
  const start = new Date(today);
  start.setHours(0, 0, 0, 0);
  const end = new Date(today);
  end.setHours(23, 59, 59, 999);

  const orders = await Order.find({
    createdAt: { $gte: start, $lte: end },
    status: "paid",
  });

  const totalSales = orders.reduce((sum, o) => sum + o.total, 0);
  const totalCustomers = orders.reduce((sum, o) => sum + o.customerCount, 0);
  const totalOrders = orders.length;

  const itemMap: Record<string, { qty: number; total: number }> = {};

  orders.forEach((order) => {
    order.items.forEach((item) => {
      if (!itemMap[item.product]) {
        itemMap[item.product] = { qty: 0, total: 0 };
      }
      itemMap[item.product].qty += item.quantity;
      itemMap[item.product].total += item.quantity * item.price;
    });
  });

  const allItems = Object.entries(itemMap).map(([name, data]) => ({
    name,
    ...data,
  }));

  const topItems = [...allItems].sort((a, b) => b.qty - a.qty).slice(0, 2);

  const itemList = allItems
    .map(
      (item) =>
        `${item.name} : (x${item.qty}) รายได้ : ${item.total.toLocaleString()}฿`
    )
    .join("\n");

  const now = new Date();
  const time = format(now, "HH:mm:ss");
  const date = format(now, "dd/MM/yyyy", { locale: th });

  const message = `
📊 รายงานยอดขายประจำวันที่ ${date}

🧾 ยอดรวม: ${totalSales.toLocaleString()} บาท
👥 ลูกค้า: ${totalCustomers} คน
🧺 ออเดอร์: ${totalOrders} ออเดอร์
-----------------------------------------------------------

🔥 สินค้าขายดี:
${topItems
  .map(
    (item, index) =>
      `${index + 1}. ${item.name} (ขาย ${
        item.qty
      }) = ${item.total.toLocaleString()} บาท`
  )
  .join("\n")}
-----------------------------------------------------------

ยอดขายตามรายการ ❤️
${itemList}

🕓 เวลาสรุปรายงาน: ${time} - ${date}
  `.trim();

  return message;
}
