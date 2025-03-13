import mongoose, { Document, Model } from "mongoose";

// สร้าง Counter Schema สำหรับเก็บลำดับล่าสุด
const counterSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  seq: { type: Number, default: 0 },
});

const Counter =
  mongoose.models.Counter || mongoose.model("Counter", counterSchema);

// ปรับ Order Interface ให้รองรับ num
interface IOrder extends Document {
  num: number; // เพิ่ม field num
  items: { product: string; quantity: number }[];
  total: number;
  createdAt: Date;
}

const OrderSchema = new mongoose.Schema<IOrder>({
  num: { type: Number, unique: true }, // เลขลำดับของออเดอร์
  items: [
    {
      product: { type: String, required: true },
      quantity: { type: Number, required: true },
    },
  ],
  total: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

// ใช้ pre-save middleware เพื่อให้ num เพิ่มขึ้นอัตโนมัติ
OrderSchema.pre("save", async function (next) {
  if (!this.isNew) return next(); // ให้ทำงานเฉพาะตอนสร้างใหม่เท่านั้น

  try {
    const counter = await Counter.findOneAndUpdate(
      { name: "order" }, // หา counter ของ order
      { $inc: { seq: 1 } }, // เพิ่มค่า seq ทีละ 1
      { new: true, upsert: true } // ถ้าไม่มีให้สร้างใหม่
    );
    this.num = counter.seq; // กำหนดค่า `num` ให้กับออเดอร์นี้
    next();
  } catch (error) {
    console.log(error);
  }
});

const Order: Model<IOrder> =
  mongoose.models.Order || mongoose.model<IOrder>("Order", OrderSchema);

export default Order;
