"use client";

import { useOrderStore } from "@/lib/store/orderStore";
import { useEffect } from "react";

export default function FetchOrders() {
  const setOrders = useOrderStore((state) => state.setOrders);

  useEffect(() => {
    async function fetchOrders() {
        const API_BASE_URL = process.env.NEXTAUTH_URL || "http://localhost:3000"
      try {
        const response = await fetch(`${API_BASE_URL}/api/fetchorders`); // ✅ เรียก API
        const data = await response.json();
        setOrders(data.orders); // ✅ บันทึกข้อมูลเข้า Zustand
        console.log("✅ ดึงข้อมูลสำเร็จ:", data);
      } catch (error) {
        console.error("❌ ดึงข้อมูลไม่สำเร็จ", error);
      }
    }

    fetchOrders();
  }, [setOrders]); // ✅ useEffect ทำงานครั้งเดียว

  return null; // ✅ ไม่ต้องแสดง UI อะไรเลย
}
