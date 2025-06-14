// scripts/testReport.ts
import { format } from "date-fns";
import { th } from "date-fns/locale";

const mockOrders = [
  {
    total: 114,
    customerCount: 1,
    createdAt: new Date(),
    items: [
      { product: "ก๋วยเตี๋ยวเนื้อ ธรรมดา", quantity: 1, price: 65 },
      { product: "ชาไทย", quantity: 1, price: 49 },
    ],
  },
  {
    total: 390,
    customerCount: 3,
    createdAt: new Date(),
    items: [
      { product: "ก๋วยเตี๋ยวเนื้อ ธรรมดา", quantity: 3, price: 65 },
      { product: "เกาเหลาเนื้อ พิเศษ", quantity: 2, price: 80 },
    ],
  },
  {
    total: 740,
    customerCount: 5,
    createdAt: new Date(),
    items: [
      { product: "ชาไทย", quantity: 7, price: 49 },
      { product: "ข้าวสวย", quantity: 2, price: 10 },
    ],
  },
];

const generateReport = () => {
  const totalSales = mockOrders.reduce((sum, o) => sum + o.total, 0);
  const totalCustomers = mockOrders.reduce(
    (sum, o) => sum + o.customerCount,
    0
  );
  const totalOrders = mockOrders.length;

  const itemMap: Record<string, { qty: number; total: number }> = {};
  mockOrders.forEach((order) => {
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
        `${item.name} : (x${item.qty}) รายได้ : ${item.total.toLocaleString()}`
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

  console.log(message);
};

generateReport();
