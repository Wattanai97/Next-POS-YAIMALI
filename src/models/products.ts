import mongoose, { Document, Model } from "mongoose";

// กำหนดประเภทของ category เป็น enum ที่มีค่าคงที่
enum Category {
  Foods = "Foods",
  Drinks = "Drinks",
}

interface IProduct extends Document {
  productId: string;
  name: string;
  price: number;
  category: Category; // ใช้ enum
}

const ProductSchema = new mongoose.Schema<IProduct>({
  productId: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, enum: Category, required: true }, // ใช้ enum ใน schema
});

const Product: Model<IProduct> =
  mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);

export default Product;
