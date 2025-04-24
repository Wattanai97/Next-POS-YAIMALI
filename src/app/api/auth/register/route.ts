import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { connectDB } from "@/lib/db";
import User from "@/models/user";

export async function POST(req: NextRequest) {
  try {
    console.log(`connecting to mongoDB`);
    await connectDB();
    console.log(`Connect to Database Success !`);

    const { username, password } = await req.json();

    // เช็คว่ามี Email นี้อยู่แล้วหรือไม่
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return NextResponse.json(
        { error: "Email already exists" },
        { status: 400 }
      );
    }

    // เข้ารหัสรหัสผ่าน
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    return NextResponse.json(
      { message: "User registered successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
