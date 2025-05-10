// import { useMemo } from "react";
// import { generateDateList } from "./genarate-datelist";
// import { Order } from "@/components/forSaleReportPage/order-card";

// export function useGroupedOrders(
//   orders: Order[],
//   selectedDate: Date | null,
//   range: "weekly" | "monthly",
//   currentPage: number,
//   itemsPerPage = 10
// ) {
//   const groupedData = useMemo(() => {
//     if (!selectedDate || orders.length === 0) {
//       return { pages: [[]], totalPages: 1 };
//     }

//     // ✅ ใช้ฟังก์ชัน generateDateList ที่ import มา
//     const daysInRange = generateDateList(selectedDate, range);

//     // ✅ จัดกลุ่มออเดอร์ตามวัน
//     const grouped = daysInRange.map((date) => {
//       const ordersOfDay = orders.filter((o) => {
//         const orderDate = new Date(o.createdAt); // เปลี่ยนตรงนี้ให้ตรงกับ field ที่ใช้จริง
//         return (
//           orderDate.getDate() === date.getDate() &&
//           orderDate.getMonth() === date.getMonth() &&
//           orderDate.getFullYear() === date.getFullYear()
//         );
//       });

//       return { date, orders: ordersOfDay };
//     });

//     // ✅ แบ่งหน้า
//     const pages: (typeof grouped)[] = [];
//     for (let i = 0; i < grouped.length; i += itemsPerPage) {
//       pages.push(grouped.slice(i, i + itemsPerPage));
//     }

//     return {
//       pages,
//       totalPages: pages.length,
//     };
//   }, [orders, selectedDate, range, currentPage, itemsPerPage]);

//   return {
//     groupedOrders: groupedData.pages[currentPage - 1] || [],
//     totalPages: groupedData.totalPages,
//   };
// }
