import { useState, useEffect, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useSession } from "next-auth/react";
//  FormatDate Function
const formatThaiShortDate = (dateString: string): string => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0"); // เติม 0 ถ้าตัวเลขเป็นหลักเดียว
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // เดือนเริ่มที่ 0 ต้อง +1
  const year = (date.getFullYear() + 543).toString().slice(-2); // แปลงเป็น พ.ศ. และเอา 2 หลักท้าย
  return `${day}/${month}/${year}`;
};
//
const formatThaiShortDateForReport = (dateString: string): string => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0"); // เติม 0 ถ้าตัวเลขเป็นหลักเดียว
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // เดือนเริ่มที่ 0 ต้อง +1
  return `${day}/${month}`;
};
//
interface IOrder {
  num: number; // เพิ่ม field num
  items: {
    product: string;
    quantity: number;
    price: number;
    category: string;
  }[];
  total: number;
  customerCount: number;
  createdAt: string;
}

export default function Dashboard() {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const { data: session } = useSession();
  const [loading, setLoading] = useState<boolean>(false);
  // Page Control For Check
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(4);
  const displayedOrders = useMemo(() => {
    return orders.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
  }, [orders, currentPage, itemsPerPage]);

  const totalPages = useMemo(
    () => Math.ceil(orders.length / itemsPerPage),
    [orders, itemsPerPage]
  );
  // ฟังก์ชันเปลี่ยนหน้า
  const changePage = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };
  // End Page Control
  // Page Control For Table
  const [tableCurrentPage, setTableCurrentPage] = useState<number>(1);
  const [tableItemsPerPage] = useState<number>(10);

  // คำนวณรายการสำหรับตารางแยกจาก Card View
  const tableDisplayedOrders = useMemo(() => {
    return orders.slice(
      (tableCurrentPage - 1) * tableItemsPerPage,
      tableCurrentPage * tableItemsPerPage
    );
  }, [orders, tableCurrentPage, tableItemsPerPage]);

  const tableTotalPages = useMemo(
    () => Math.ceil(orders.length / tableItemsPerPage),
    [orders, tableItemsPerPage]
  );

  const changeTablePage = (newPage: number) => {
    if (newPage >= 1 && newPage <= tableTotalPages) {
      setTableCurrentPage(newPage);
    }
  };
  // End Page Control For Table
  const handlerfetch = async () => {
    setLoading(true);
    const API_BASE_URL = process.env.NEXTAUTH_URL || "http://localhost:3000";
    try {
      const response = await fetch(`${API_BASE_URL}/api/fetchorders`);
      if (!response.ok) {
        console.log(`Field to fetch data || Response ! OK`);
      }
      const res = await response.json();
      console.log(`Success to Fetch This Orders ${JSON.stringify(res)}`);
      setOrders(res.orders);
    } catch (error) {
      console.log(`Error => ${error}`);
    } finally {
      setLoading(false);
    }
  };
  // Sale Report And Customers Report Card
  const salesChartData = useMemo(() => {
    return orders.map((order) => ({
      date: formatThaiShortDateForReport(order.createdAt), // แปลงวันที่ให้อยู่ในรูปแบบไทย
      total: order.total, // ยอดขายรวม
      customers: order.customerCount, // จำนวนลูกค้า
    }));
  }, [orders]);
  //
  useEffect(() => {
    if (session?.user.username) {
      handlerfetch();
    }
  }, [session]);
  if (loading) {
    return (
      <p className="text-center my-4 text-3xl font-bold text-black">
        Loading...
      </p>
    );
  }
  return (
    <div>
      <div className="mx-2 p-0.5 grid gap-2.5 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4">
        {/* Transaction Bill View */}
        {displayedOrders?.length > 0 ? (
          displayedOrders?.map((txn) => (
            <Card key={txn.num} className="lg:col-span-1">
              <CardContent className="p-3">
                <div className="border-b py-2">
                  <h2 className="text-lg text-center font-semibold">
                    เตี๋ยวซิ้นหอม
                  </h2>
                  <p className="text-sm font-semibold">Order #{txn.num}</p>
                  <div className="mx-1">
                    {txn.items.map((e, index) => (
                      <div key={index} className="flex justify-between">
                        <p className="text-lg font-semibold">{e.product}</p>
                        <p className="text-xs text-slate-700">*{e.quantity}</p>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between">
                    <p className="mx-0.5 text-sm font-semibold mt-2">
                      วันที่: {formatThaiShortDate(txn.createdAt)}
                    </p>
                    <p className="mx-0.5 text-sm font-semibold mt-2">
                      Total: {txn.total}฿
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-center text-gray-500">No orders found.</p>
        )}
      </div>
      <div className="flex justify-center">
        <div className="flex xxs:mx-1 xxs:gap-2 gap-4 mt-4">
          <button
            onClick={() => changePage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-600 text-white rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-white">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => changePage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-gray-600 text-white rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
      {/* Transaction Table view */}
      <div className="p-6 xxs:grid xxs:grid-cols-1 md:grid md:grid-cols-2 lg:grid lg:grid-cols-2 gap-6">
        {tableDisplayedOrders?.length > 0 ? (
          <Card className="w-full overflow-hidden lg:col-span-2">
            <CardContent className="p-2">
              <h2 className="text-xl text-center font-bold mb-2">
                Transaction Table
              </h2>
              <div className="w-full overflow-x-auto">
                <Table className="min-w-[300px]">
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order#</TableHead>
                      <TableHead>ลูกค้า</TableHead>
                      <TableHead>ยอด</TableHead>
                      <TableHead>วันที่</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tableDisplayedOrders.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>{item.num}</TableCell>
                        <TableCell>{item.customerCount}</TableCell>
                        <TableCell className="font-semibold">
                          {item.total}฿
                        </TableCell>
                        <TableCell>
                          {formatThaiShortDate(item.createdAt)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              {/* Pagination ของตาราง */}
              <div className="flex justify-center mt-4">
                <button
                  onClick={() => changeTablePage(tableCurrentPage - 1)}
                  disabled={tableCurrentPage === 1}
                  className="px-3 py-1 bg-gray-600 text-white rounded disabled:opacity-50"
                >
                  Previous
                </button>
                <span className="mx-3 text-black">
                  Page {tableCurrentPage} of {tableTotalPages}
                </span>
                <button
                  onClick={() => changeTablePage(tableCurrentPage + 1)}
                  disabled={tableCurrentPage === tableTotalPages}
                  className="px-3 py-1 bg-gray-600 text-white rounded disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <p className="text-center text-gray-500">No orders found.</p>
        )}

        {/* Sales Report */}
        <Card className="w-full overflow-x-auto lg:col-span-2">
          <CardContent className="p-1.5">
            <h2 className="text-xl font-bold mb-2 text-center">Sales Report</h2>

            {/* กราฟ Total Sales */}
            <div className="w-full h-[200px] sm:h-[250px] md:h-[300px]">
              <h3 className="text-lg font-semibold text-center mb-2">
                Total Sales
              </h3>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={salesChartData}>
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="total"
                    stroke="#8884d8"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* กราฟ Customer Count */}
            <div className="w-full h-[200px] sm:h-[250px] md:h-[300px] mt-6">
              <hr />
              <h3 className="text-lg font-semibold text-center mb-2">
                Customer Count
              </h3>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={salesChartData}>
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="customers"
                    stroke="#82ca9d"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/*  */}
    </div>
  );
}
