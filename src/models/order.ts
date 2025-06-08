import mongoose, { Document, Model } from "mongoose";

export enum statusType {
  HOLD = "hold",
  PAID = "paid",
}

const counterSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  seq: { type: Number, default: 0 }, //
});

const Counter =
  mongoose.models.Counter || mongoose.model("Counter", counterSchema);

export interface IOrder extends Document {
  num: number;
  items: {
    productId: string;
    product: string;
    quantity: number;
    price: number;
    category: string;
  }[];
  status: statusType;
  total: number;
  createdAt: Date;
  customerCount: number;
}

const OrderSchema = new mongoose.Schema<IOrder>({
  num: { type: Number, unique: true },

  items: [
    {
      productId: { type: String, required: true },
      product: { type: String, required: true },
      price: { type: Number, required: true },
      category: { type: String, required: true },
      quantity: { type: Number, required: true },
    },
  ],
  total: { type: Number, required: true },
  status: {
    type: String,
    enum: ["hold", "paid"],
  },
  createdAt: { type: Date, default: Date.now },
  customerCount: { type: Number, default: 0 },
});

OrderSchema.pre("save", async function (next) {
  if (!this.isNew) return next();
  try {
    const counter = await Counter.findOneAndUpdate(
      { name: "order" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    this.num = counter.seq;

    //
    this.customerCount = this.items
      .filter((item) => item.category === "Foods" && item.price > 60)
      .reduce((acc, item) => acc + item.quantity, 0);

    next();
  } catch (error) {
    console.error("Error in pre-save middleware:", error);
    throw error;
  }
});

const Order: Model<IOrder> =
  mongoose.models.Order || mongoose.model<IOrder>("Order", OrderSchema);

export default Order;
