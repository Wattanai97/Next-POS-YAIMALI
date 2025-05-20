import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { FilteredByType } from "@/hooks/forPosPage/filtered-product-bytype";
import { useOrderCartStore } from "@/lib/store/orders/orders-carts/useorder-cart-store";
const ProductMenu = () => {
  const { addToCart } = useOrderCartStore();
  const { filteredProducts } = FilteredByType();
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-0.5">
        {filteredProducts.map((product) => (
          <Card
            key={product.productId.toString()}
            className="p-0.5 m-0.5 border border-solid border-black dark:border-white relative"
          >
            <CardContent>
              <h3>{product.name}</h3>
              <p>฿{product.price}</p>
              <div className="absolute bottom-2.5 right-3">
                <button
                  className="delete-button hover:scale-125"
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
