import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { FilteredByType } from "@/hooks/orderspagelogic/FilteredByType";
import { useOrderCartStore } from "@/lib/store/useOrderCartStore";
const ProductMenu = () => {
  const { addToCart } = useOrderCartStore();
  const { filteredProducts } = FilteredByType();
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-0.5">
        {filteredProducts.map((product) => (
          <Card
            key={product.productId.toString()}
            className="p-0.5 m-0.5 border border-solid border-black dark:border-white"
          >
            <CardContent>
              <h3>{product.name}</h3>
              <div className="flex justify-between">
                <p>฿{product.price}</p>
                <button
                  className="bg-slate-900 rounded-md px-2 py-0.5 text-white"
                  onClick={() => addToCart(product)}
                >
                  +
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
};

export default ProductMenu;
