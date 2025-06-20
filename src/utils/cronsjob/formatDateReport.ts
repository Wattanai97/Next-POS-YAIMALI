// utils/sale-report/format-datetime-salereport.ts
import { formatInTimeZone } from "date-fns-tz";
import { th } from "date-fns/locale";

/**
 * แปลงเวลาให้เป็นโซนไทย (UTC+7) และแสดง วันที่ + เวลา
 * เช่น 20/06/2025 19:05:48
 */
export function formatDateTimeTH(date: Date) {
  return formatInTimeZone(date, "Asia/Bangkok", "dd/MM/yyyy HH:mm:ss", {
    locale: th,
  });
}