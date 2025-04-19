export const formatThaiShortDate = (dateString: string): string => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0"); // เติม 0 ถ้าตัวเลขเป็นหลักเดียว
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // เดือนเริ่มที่ 0 ต้อง +1
  const year = (date.getFullYear() + 543).toString().slice(-2); // แปลงเป็น พ.ศ. และเอา 2 หลักท้าย
  return `${day}/${month}/${year}`;
};

export const formatThaiShortDateForReport = (dateString: string): string => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0"); // เติม 0 ถ้าตัวเลขเป็นหลักเดียว
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // เดือนเริ่มที่ 0 ต้อง +1
  return `${day}/${month}`;
};
