"use client";
import React from "react";
import SelectedCheckbox from "../ui/selected-checkbox";
import { useNodesStore } from "@/lib/store/orders/notes/use-nodes-store";
// รายการเมนูอาหาร
import {
  checkboxMeatItem,
  checkboxMenuItems,
  checkboxNoodleItem,
  checkboxSizeItem,
  checkboxSoupItem,
  checkboxItem,
} from "./dataitems";
const NotesCheckboxMenu = () => {
  const {
    checkboxLabels,
    handleCheckboxChange,
    setDetail,
    incrementQuantity,
    decrementQuantity,
    quantity,
  } = useNodesStore();
  const handleDetailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDetail(e.target.value);
  };
  return (
    <div className="block">
      {/* MenuItem */}
      <p className="text-start font-bold my-3 text-2xl text-zinc-700 dark:text-red-200 ">
        เลือกเมนูอาหาร
      </p>
      <SelectedCheckbox
        selectedItems={checkboxLabels}
        handleCheckboxChange={handleCheckboxChange}
        checkboxitem={checkboxMenuItems}
      />
      {/* MeatItem */}
      <p className="text-start font-bold my-3 text-2xl text-zinc-700 dark:text-red-200 ">
        เลือกเนื้อ
      </p>
      <SelectedCheckbox
        selectedItems={checkboxLabels}
        handleCheckboxChange={handleCheckboxChange}
        checkboxitem={checkboxMeatItem}
      />
      {/* SoupItem */}
      <p className="text-start font-bold my-3 text-2xl text-zinc-700 dark:text-red-200 ">
        เลือกน้ำซุป
      </p>
      <SelectedCheckbox
        selectedItems={checkboxLabels}
        handleCheckboxChange={handleCheckboxChange}
        checkboxitem={checkboxSoupItem}
      />
      {/* NoodleItem */}
      <p className="text-start font-bold my-3 text-2xl text-zinc-700 dark:text-red-200 ">
        เลือกเส้น
      </p>
      <SelectedCheckbox
        selectedItems={checkboxLabels}
        handleCheckboxChange={handleCheckboxChange}
        checkboxitem={checkboxNoodleItem}
      />
      {/* SizeItem */}
      <p className="text-start font-bold my-3 text-2xl text-zinc-700 dark:text-red-200 ">
        เลือกขนาด
      </p>
      <SelectedCheckbox
        selectedItems={checkboxLabels}
        handleCheckboxChange={handleCheckboxChange}
        checkboxitem={checkboxSizeItem}
      />
      {/* EggItem */}
      <p className="text-start font-bold my-3 text-2xl text-zinc-700 dark:text-red-200 ">
        เพิ่มเติม
      </p>
      <SelectedCheckbox
        selectedItems={checkboxLabels}
        handleCheckboxChange={handleCheckboxChange}
        checkboxitem={checkboxItem}
      />
      <input
        onChange={handleDetailChange}
        type="text"
        className="ps-3 w-full my-2 text-lg font-medium py-2 rounded-md"
        placeholder="รายละเอียดถ้ามี"
      />
      {/* จำนวน */}
      <div className="flex justify-center">
        <div className="QuantiTy">
          <button
            onClick={decrementQuantity}
            className="px-3 py-1 text-zinc-700 dark:text-zinc-900 bg-gray-300 rounded-l hover:bg-gray-400"
            type="button"
          >
            -
          </button>
          <input
            type="text"
            value={quantity}
            readOnly
            className="mx-3 w-12 text-center border border-gray-300"
          />
          <button
            onClick={incrementQuantity}
            className="px-3 py-1 text-zinc-700 dark:text-zinc-900 bg-gray-300 rounded-r hover:bg-gray-400"
            type="button"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotesCheckboxMenu;
