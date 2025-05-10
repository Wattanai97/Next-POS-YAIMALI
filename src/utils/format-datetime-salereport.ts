export const formatTime = (date: Date) => {
  return `${String(date.getHours()).padStart(2, "0")}:${String(
    date.getMinutes()
  ).padStart(2, "0")}:${String(date.getSeconds()).padStart(2, "0")} น.`;
};

export const formatDate = (date: Date | null) => {
  // เช็คว่า date เป็น null หรือไม่
  if (!date) {
    return "ไม่ระบุวันที่"; // ถ้าเป็น null ให้คืนค่าข้อความว่า "ไม่ระบุวันที่"
  }
  // หาก date ไม่เป็น null ใช้ getDate(), getMonth(), getFullYear() ได้ตามปกติ
  return `${String(date.getDate()).padStart(2, "0")}/${String(
    date.getMonth() + 1
  ).padStart(2, "0")}/${date.getFullYear()}`;
};
