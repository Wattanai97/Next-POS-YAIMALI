"use client";
import React from "react";
import { CategoryFilterType } from "@/hooks/forSaleReports/forSaleByProduct/sales-by-product";

type Props = {
  tempCategory: CategoryFilterType;
  setTempCategory: (category: CategoryFilterType) => void;
};

export default function CategoryFilterToolbar({
  tempCategory,
  setTempCategory,
}: Props) {
  const categoryOptions: CategoryFilterType[] = [
    "ก๋วยเตี๋ยวเนื้อ",
    "ก๋วยเตี๋ยวหมู",
    "เกาเหลาเนื้อ",
    "เกาเหลาหมู",
    "ข้าวกะเพราเนื้อ",
    "ข้าวกะเพราหมู",
    "เส้นกะเพราเนื้อ",
    "เส้นกะเพราหมู",
    "ชาไทย",
    "ชาเขียว",
    "นมสดยายมะลิ",
    "โกโก้",
    "ทั้งหมด",
  ];

  return (
    <select
      value={tempCategory}
      onChange={(e) => setTempCategory(e.target.value as CategoryFilterType)}
      className="border p-2 rounded"
    >
      {categoryOptions.map((cat) => (
        <option key={cat} value={cat}>
          {cat}
        </option>
      ))}
    </select>
  );
}
