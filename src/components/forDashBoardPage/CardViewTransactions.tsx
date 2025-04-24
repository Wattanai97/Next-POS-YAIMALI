import React from "react";
import { useOrderStore } from "@/lib/store/useOrdersAndHoldOrders";
import { formatThaiShortDate } from "../forDashBoardPage/logic/forMatDate";
import { useOrdersPagination } from "../forDashBoardPage/logic/useOrdersPagination";
import { Card, CardContent } from "@/components/ui/card";
import Pagecontrolcardview from "./PageControlCardView";
import { useOrderCardViewPaginationStore } from "@/lib/store/useOrderPaginationStore";
const Cardviewtransactions = () => {
  const { orders } = useOrderStore();
  const { currentPage, itemsPerPage } = useOrderCardViewPaginationStore();
  const { displayedOrders } = useOrdersPagination(
    orders,
    currentPage,
    itemsPerPage
  );
  return (
    <>
      <div className="mx-2 p-0.5 grid gap-2.5 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4">
        {displayedOrders?.length > 0 ? (
          displayedOrders.map((txn) => (
            <Card
              key={txn.num}
              className="lg:col-span-1 min-h-[300px] max-h-[300px] flex flex-col"
            >
              <CardContent className="p-3 flex flex-col flex-1">
                {/* ส่วนบน: Header + รายการ */}
                <div className="border-b pb-2">
                  <h2 className="text-lg text-center font-semibold">
                    เตี๋ยวซิ้นหอม
                  </h2>
                  <p className="text-sm font-semibold">Order #{txn.num}</p>

                  {/* กล่องรายการ scroll ได้ */}
                  <div className="mx-1 mt-2 space-y-1 max-h-[150px] overflow-y-auto pr-1">
                    {txn.items.map((e, index) => (
                      <div key={index} className="flex justify-between">
                        <p className="text-base font-medium">{e.product}</p>
                        <p className="text-xs text-slate-600">*{e.quantity}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Spacer ดันลงล่าง */}
                <div className="flex-grow" />

                {/* ส่วนล่าง: วันที่ + total ชิดล่างเป๊ะ */}
                <div className="flex justify-between pt-2 text-sm font-semibold text-slate-700 dark:text-white">
                  <p>วันที่: {formatThaiShortDate(txn.createdAt)}</p>
                  <p>Total: {txn.total}฿</p>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-center">No orders found.</p>
        )}
      </div>
      <div className="flex justify-center">
        <Pagecontrolcardview />
      </div>
    </>
  );
};

export default Cardviewtransactions;
