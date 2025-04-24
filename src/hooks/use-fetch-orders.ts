"use client";
import { useOrderStore } from "@/lib/store/useorders-hold-orders";
import { useLoadingStore } from "@/lib/store/useloding-errormessage";

// useFetchOrders.ts
export default function useFetchOrders() {
  const { setOrders } = useOrderStore();
  const { setError, setIsLoading } = useLoadingStore();
  
  async function fetchOrders() {
    const API_BASE_URL =
      process.env.NEXT_PUBLIC_API_URL || "https://pos-yaimali.vercel.app";
    console.log("API_BASE_URL:", API_BASE_URL); // พิมพ์ค่าของ API_BASE_URL
    try {
      setIsLoading(false);
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
      if (error instanceof Error) {
        setError(error.message)
      }
      console.error("❌ ดึงข้อมูลไม่สำเร็จ", error);
    } finally {
      setIsLoading(true);
    }
  }
  return { fetchOrders,};
}
