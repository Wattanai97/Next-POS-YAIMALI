export function generateDateList(date: Date, range: "weekly" | "monthly") {
  const dates: Date[] = [];

  if (range === "weekly") {
    for (let i = 6; i >= 0; i--) {
      const d = new Date(date);
      d.setDate(d.getDate() - i);
      d.setHours(0, 0, 0, 0); // ✅ ปรับให้ไม่มีเวลา
      dates.push(d);
    }
  } else if (range === "monthly") {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let i = 1; i <= daysInMonth; i++) {
      const d = new Date(year, month, i);
      d.setHours(0, 0, 0, 0); // ✅ ปรับให้ไม่มีเวลา
      dates.push(d);
    }
  }

  return dates;
}
