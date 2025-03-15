"use client";

import { useOrderStore } from "@/lib/store/orderStore";
import { useState, useEffect } from "react";

export default function FetchOrders() {
  const setOrders = useOrderStore((state) => state.setOrders);
  const [loading, setLoading] = useState(true); // เพื่อดูสถานะการโหลดข้อมูล
  const [error, setError] = useState<string | null>(null); // เพื่อเก็บข้อผิดพลาด

  useEffect(() => {
    async function fetchOrders() {
      const API_BASE_URL =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
      try {
        const response = await fetch(`${API_BASE_URL}/api/fetchorders`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setOrders(data.orders);
        console.log("✅ ดึงข้อมูลสำเร็จ:", data);
      } catch (error) {
        setError("❌ ดึงข้อมูลไม่สำเร็จ");
        console.error("❌ ดึงข้อมูลไม่สำเร็จ", error);
      } finally {
        setLoading(false); // ไม่ว่าจะสำเร็จหรือไม่ให้หยุดการโหลด
      }
    }

    fetchOrders();
  }, [setOrders]);

  if (loading) {
    return <div>กำลังโหลดข้อมูล...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return null; // ไม่แสดง UI อะไรถ้าทุกอย่างถูกโหลดเสร็จ
}
