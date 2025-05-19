// components/SelectedItemsList.tsx
import { useNodesStore } from "@/lib/store/orders/notes/use-nodes-store";
import { useLoadingStore } from "@/lib/store/useloding-errormessage";
const SelectedItemsList = () => {
  const { setIsLoading, setError } = useLoadingStore();
  const { selectedItems, setSelectedItems } = useNodesStore();
  const handleDelete = async (id: string) => {
    setIsLoading(false);
    const API_BASE_URL =
      process.env.NEXT_PUBLIC_API_URL || "https://pos-yaimali.vercel.app";
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/nodesOrder/deleteNodesorder`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to delete order");
      }

      // อัปเดตรายการหลังจากลบ
      setSelectedItems(selectedItems.filter((item) => item._id !== id));
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    } finally {
      setIsLoading(true);
    }
  };
  if (selectedItems.length === 0) {
    return <p className="text-gray-500">ยังไม่มีรายการออเดอร์ที่บันทึก</p>;
  }

  return (
    <ul className="space-y-4 ">
      {selectedItems.map((item, index) => (
        <li
          key={index}
          className="border border-gray-200 rounded-lg p-4 shadow-sm text-start"
        >
          <p className="font-medium text-sm text-zinc-900 dark:text-zinc-200">
            🍜 {item.title}
          </p>
          {item.detail && (
            <p className="text-sm text-zinc-900 dark:text-zinc-200">
              📝รายละเอียด : {item.detail}
            </p>
          )}
          <p className="text-sm text-zinc-900 dark:text-zinc-200">
            🔢 จำนวน : {item.quantity}
          </p>
          <div className="flex justify-end">
            <button
              className="button-navbar btn-navbar"
              onClick={() => handleDelete(item._id)}
            >
              ลบ
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default SelectedItemsList;
