// models/notesOrder.ts
import mongoose from "mongoose";

interface NodesOrder extends Document {
  title: string;
  detail: string;
  quantity: number;
  createdAt: Date;
}
const NotesOrderSchema = new mongoose.Schema<NodesOrder>({
  title: { type: String, required: true }, // เช่น "ข้าวมันไก่, น้ำเปล่า"
  detail: { type: String, default: "" }, // หมายเหตุ เช่น "ไม่เอาหนัง"
  quantity: { type: Number, default: 1 }, // จำนวน
  createdAt: { type: Date, default: Date.now }, // เวลาบันทึก
});

export const NotesOrder =
  mongoose.models.NotesOrder ||
  mongoose.model<NodesOrder>("NotesOrder", NotesOrderSchema);
