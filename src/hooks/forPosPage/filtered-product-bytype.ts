// Filter Product Menu By Type
import { products } from "@/lib/store/product";
import { useMemo } from "react";
import { useFilterProductByType } from "@/lib/store/useProductFilterTypeStore";
export const FilteredByType = () => {
  const { filterType } = useFilterProductByType();
  // ✅ ใช้ useMemo เพื่อกรอง product ตาม filterType
  const filteredProducts = useMemo(() => {
    return products.filter(
      (p) => filterType === "All" || p.category === filterType
    );
  }, [products, filterType]);

  return { filteredProducts };
};
