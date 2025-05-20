export interface ProductType {
  productId: string;
  name: string;
  price: number;
  category: "All" | "Foods" | "Drinks";
}