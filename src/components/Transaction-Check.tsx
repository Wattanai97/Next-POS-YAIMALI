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
import { Button } from "@/components/ui/button";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useSession } from "next-auth/react";

const formatThaiShortDate = (dateString: string): string => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0"); // เติม 0 ถ้าตัวเลขเป็นหลักเดียว
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // เดือนเริ่มที่ 0 ต้อง +1
  const year = (date.getFullYear() + 543).toString().slice(-2); // แปลงเป็น พ.ศ. และเอา 2 หลักท้าย
  return `${day}/${month}/${year}`;
};

const transactions = [
  { id: "TXN001", type: "Sale", amount: 1200, date: "2024-03-12" },
  { id: "TXN002", type: "Refund", amount: -200, date: "2024-03-13" },
  { id: "TXN003", type: "Sale", amount: 800, date: "2024-03-14" },
];

const salesData = [
  { date: "Mar 10", total: 5000 },
  { date: "Mar 11", total: 7000 },
  { date: "Mar 12", total: 8500 },
];
interface IOrder {
  num: number; // เพิ่ม field num
  items: { product: string; quantity: number }[];
  total: number;
  createdAt: string;
}

export default function Dashboard() {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const { data: session } = useSession();
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(4);
  // Page Control
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
  //
  // End Page Control
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
      <div className="p-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
                      Total: ${txn.total}
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
        <div className="flex gap-4 mt-4">
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
      {/* Transaction Table */}
      <div className="p-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardContent className="p-4 overflow-x-auto">
            <h2 className="text-xl font-bold mb-4">Transaction Table</h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((txn) => (
                  <TableRow key={txn.id}>
                    <TableCell>{txn.id}</TableCell>
                    <TableCell>{txn.type}</TableCell>
                    <TableCell className="font-semibold">
                      ${txn.amount}
                    </TableCell>
                    <TableCell>{txn.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Sales Report */}
        <Card className="lg:col-span-3">
          <CardContent className="p-4">
            <h2 className="text-xl font-bold mb-4">Sales Report</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesData}>
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
          </CardContent>
        </Card>
      </div>
      {/*  */}
    </div>
  );
}
