import mongoose ,{Document ,Model} from "mongoose";

interface IProduct extends Document{
    name:string,
    price:number,
    category : {}
}

const ProductSchema = new mongoose.Schema<IProduct>({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, enum: ["noodle", "drink"], required: true },
});

const Product:Model<IProduct> = mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);

export default Product;
