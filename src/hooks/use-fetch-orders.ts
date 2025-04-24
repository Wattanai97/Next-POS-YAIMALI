"use client";
import { useOrderStore } from "@/lib/store/useOrdersAndHoldOrders";
import { useState } from "react";
// useFetchOrders.ts
export default function useFetchOrders() {
  const { setOrders } = useOrderStore();
  const [loading, setLoading] = useState(false); // เพื่อดูสถานะการโหลดข้อมูล
  const [error, setError] = useState<string | null>(null); // เพื่อเก็บข้อผิดพลาด

  async function fetchOrders() {
    const API_BASE_URL =
      process.env.NEXT_PUBLIC_API_URL || "https://pos-yaimali.vercel.app";
    console.log("API_BASE_URL:", API_BASE_URL); // พิมพ์ค่าของ API_BASE_URL
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/api/fetchorders`, {
        cache: "no-store",
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("✅ ดึงข้อมูลสำเร็จ:", data);
      setOrders(data.orders);
    } catch (error) {
      setError("❌ ดึงข้อมูลไม่สำเร็จ");
      console.error("❌ ดึงข้อมูลไม่สำเร็จ", error);
    } finally {
      setLoading(false);
    }
  }
  return { fetchOrders, error, loading };
}
