import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Order from "@/models/order";

export async function GET(req: NextRequest) {
  await connectDB();
  console.log(`Connect to Database Success`);
  try {
    const AllOrders = await Order.find({});
    if (!AllOrders) {
      return NextResponse.json(
        { message: "Orders is missing or Cannot get Orders in Database!" },
        { status: 400 }
      );
    }
    console.log(`Success to get Orders => ${AllOrders}`);
    return NextResponse.json(
      { message: "Get Orders Success", orders: AllOrders || []},
      { status: 200 }
    );
  } catch (error) {
    console.log(`Error =>`, error);
  }
}
