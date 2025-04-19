import mongoose, { Document, Model } from "mongoose";

// สร้าง Counter Schema สำหรับเก็บลำดับล่าสุด เลขที่บิล
const counterSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }, // name = order
  seq: { type: Number, default: 0 }, // จำนวนเลขที่บิล
});
// สร้าง mongoose model Conuter ที่เก็บ name order และ seq สำหรับรันเลขบิลใบเสร็จ
const Counter = mongoose.models.Counter || mongoose.model("Counter", counterSchema);

// Interface กำหนด Type และรูปแบบโครงสร้างข้อมูลของใบเสร็จ  
interface IOrder extends Document {
  num: number; // เลขที่บิล อ้างอิงจาก seq ใน model Conuters
  items: {
    product: string;
    quantity: number;
    price: number;
    category: string;
  }[];
  total: number;
  createdAt: Date;
  customerCount: number; // จำนวนลูกค้าเข้าร้าน
}
// สร้าง Schema หรือโครงสร้างที่จะเก็บข้อมูลลงใน mongodb โครงสร้างของ Order โดยอ้างอิง Type ของข้อมูล จาก Interface IOrder
const OrderSchema = new mongoose.Schema<IOrder>({
  num: { type: Number, unique: true }, // เลขลำดับของออเดอร์ unique true = ฟิลนี้ห้ามมีข้อมูลซ้ำกัน
  // items เก็บข้อมูลรายละเอียดสินค้า เช่นชื่ออาหาร ราคา หมวดหมู่ จำนวนที่สั่งซื้อ required:true คือ ต้องมีข้อมูลเท่านั้น และเก็บเป็น Array
  items: [
    {
      product: { type: String, required: true },
      price: { type: Number, required: true },
      category: { type: String, required: true },
      quantity: { type: Number, required: true },
    },
  ],
  total: { type: Number, required: true }, // total เก็บยอดซื้อรวมของ Order นี้ ซึ่งจะไปคำนวนอีกที
  createdAt: { type: Date, default: Date.now },
  customerCount: { type: Number, default: 0 }, // เก็บจำนวนลูกค้าที่เข้าร้านด้วยเพิ่มจาก Order ที่เพิ่มเข้ามาหาจาก type ที่เป็น Food และ price > 60 ตัวนี้จะนับเป็นลูกค้า 1 คน
});

// ใช้ pre-save middleware เพื่อให้ num และ customerCount คำนวณอัตโนมัติ
OrderSchema.pre("save", async function (next) {
  if (!this.isNew) return next(); // ให้ทำงานเฉพาะตอนสร้างใหม่เท่านั้น
  try {
    // ตัวแปร counter ใช้ findOneAndUpdate หา ตัว name ของ order และเพิ่มค่า seq:1 ทีละ 1 หรือเลขที่บิล จากการใช้คาถาลับ $inc
    const counter = await Counter.findOneAndUpdate(
      { name: "order" }, // หา counter ของ order
      { $inc: { seq: 1 } }, // เพิ่มค่า seq ทีละ 1
      { new: true, upsert: true } // ถ้าไม่มีให้สร้างใหม่
    );

    this.num = counter.seq; // กำหนดค่า `num` ให้กับออเดอร์นี้ ให้เท่ากับ ตัวแปร counter ที่ทำการอัพเดท seq แล้วมา save เป็น num ให้กับ Order นี้

    // คำนวณจำนวนลูกค้าเข้าร้าน โดยเช็ค category "Foods" และรวม quantity
    this.customerCount = this.items
      .filter((item) => item.category === "Foods" && item.price > 60) // ✅ เพิ่มเงื่อนไข price > 60
      .reduce((acc, item) => acc + item.quantity, 0);

    next(); // บอก middleware ว่าผมร่ายคาถาเสร็จแล้ว เซฟข้อมูลตามนี้ได้เลย
  } catch (error) {
    console.error("Error in pre-save middleware:", error);
    throw error; // ใช้ throw แทน next(error)
  }
});

const Order: Model<IOrder> =
  mongoose.models.Order || mongoose.model<IOrder>("Order", OrderSchema);

export default Order;
