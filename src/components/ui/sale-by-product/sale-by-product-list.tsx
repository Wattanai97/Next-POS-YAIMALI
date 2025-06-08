type Props = {
  salesSummary: {
    product: string;
    quantity: number;
    total: number;
  }[];
};

export default function SalesSummaryTable({ salesSummary }: Props) {
  return (
    <table className="w-full border-collapse border border-gray-300">
      <thead>
        <tr>
          <th className="border border-gray-300 p-2">สินค้า</th>
          <th className="border border-gray-300 p-2">จำนวน (ชิ้น)</th>
          <th className="border border-gray-300 p-2">ยอดขาย (บาท)</th>
        </tr>
      </thead>
      <tbody>
        {salesSummary.length === 0 && (
          <tr>
            <td colSpan={3} className="text-center p-4">
              ไม่มีข้อมูลในช่วงเวลานี้
            </td>
          </tr>
        )}
        {salesSummary.map(({ product, quantity, total }) => (
          <tr key={product}>
            <td className="border border-gray-300 p-2">{product}</td>
            <td className="border border-gray-300 p-2">{quantity}</td>
            <td className="border border-gray-300 p-2">{total.toFixed(2)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
