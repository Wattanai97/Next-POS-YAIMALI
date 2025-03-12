import mongoose, { Document, Model } from "mongoose";

// เปลี่ยนให้ product เป็น string แทน ObjectId
interface IOder extends Document {
  items: { product: string; quantity: number }[]; // ใช้ string แทน ObjectId
  total: number;
  createdAt: Date;
}

const OrderSchema = new mongoose.Schema<IOder>({
  items: [
    {
      product: { type: String, required: true }, // เปลี่ยนจาก ObjectId เป็น String
      quantity: { type: Number, required: true },
    },
  ],
  total: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Order: Model<IOder> =
  mongoose.models.Order || mongoose.model<IOder>("Order", OrderSchema);

export default Order;
