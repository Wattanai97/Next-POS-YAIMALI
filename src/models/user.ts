import mongoose, {Document,Model} from "mongoose";

interface IUser extends Document {
    _id:string | unknown
    username : string 
    password : string
    role:string
}

const UserSchema = new mongoose.Schema<IUser>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "cashier"], default: "cashier" },
});

const User:Model<IUser> = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
export default User

