"use client";
import React from "react";
import { useNotesConfirmStore } from "@/lib/store/usenodes-dialog-store";
import { useItemsNodesConfirmStore } from "@/lib/store/itesmnodes-confirm-store";
import { useNodesStore } from "@/lib/store/use-nodes-store";
import useFetchNodesOrders from "@/hooks/use-fetch-nodes-order";
import { useLoadingStore } from "@/lib/store/useloding-errormessage";
import LoadingSpinner from "@/components/loading-spiner";
import ErrorMessage from "@/components/error-message";
const Notespage = () => {
  const { fetchNodesOrders } = useFetchNodesOrders();
  const { selectedItems } = useNodesStore();
  const { isLoading, error } = useLoadingStore();
  const { opennotes } = useNotesConfirmStore();
  const { open } = useItemsNodesConfirmStore();
  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;
  return (
    <div className="min-w-screen relative xxs:mx-3 xs:mx-8 sm:mx-20 md:mx-56 lg:mx-72">
      <div className="grid grid-cols-1 my-4">
        <button
          onClick={() => {
            opennotes("บันทึกออเดอร์", () => {
              // callback หลังยืนยัน dialog (ถ้าอยากทำอะไรเพิ่มเติม)
              console.log("ยืนยันและบันทึกข้อมูลสำเร็จ");
            });
          }}
          className="button-navbar btn-navbar mb-2.5 top-0"
        >
          เปิดตัวบันทึกออเดอร์
        </button>
        {selectedItems.length > 0 && (
          <button
            onClick={() => {
              fetchNodesOrders();
              open("ดูออเดอร์ที่บันทึก", () => {
                // callback หลังยืนยัน dialog (ถ้าอยากทำอะไรเพิ่มเติม)
                console.log("ยืนยันและบันทึกข้อมูลสำเร็จ");
              });
            }}
            className="button-navbar btn-navbar mb-2.5 top-0"
          >
            ดูออเดอร์ที่บันทึก
          </button>
        )}
      </div>
    </div>
  );
};

export default Notespage;
