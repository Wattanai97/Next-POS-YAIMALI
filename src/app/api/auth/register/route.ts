import { NextRequest, NextResponse } from "next/server"; // Import NextRequest และ Response จาก next/server
import bcrypt from "bcryptjs"; // Import bycrypt สำหรับเข้ารหัส จาก bcrypt.js
import { connectDB } from "@/lib/db"; // Import ตัวเชื่อมต่อ database ที่เขียนไว้
import User from "@/models/user"; // Import Model User (ฐานข้อมูล Collection user)

// Function POST นี้ทำงานคือ ต้องรับ req กำหนด type เป็น NextRequest
export async function POST(req: NextRequest) {
  // ใช้ try catch ดัก error
  try {
    console.log(`waiting... connecting to mongoDB`);
    await connectDB(); // ทำการเชื่อมต่อ database
    console.log(`Connect to Database Success !`);
    // destructuring username และ password มาจาก req หรือค่าที่มาจากฟอร์มส่งมาใน Request
    const { username, password } = await req.json();
    // ป้องกันสมัคร Username ซ้ำ ใช้ User.findOne หา username ที่รับมาจาก Request
    const existingUser = await User.findOne({ username });
    // เช็คว่ามี Username นี้ในระะบบอยู่แล้วหรือไม่ถ้ามี หรือ existingUser เป็น true ใช้ NextResponse.json Return error:string และ status:number
    if (existingUser) {
      return NextResponse.json(
        { error: "Username already exists" },
        { status: 400 }
      );
    }
    // การทำงานหลังจาก เช็ค Username แล้วไม่ซ้ำกัน
    // เข้ารหัสรหัสผ่านโดยใช้ bcrypt ในการ hash password ทีรับมาจาก Request hash 10 ครั้ง และเก็บในตัวแปร hashedPassword
    const hashedPassword = await bcrypt.hash(password, 10);
    // สร้างตัวแปร newUser = new User() ก็คือเป็นการสร้าง ข้อมูลชุดใหม่ของ user ที่จะบันทึกลงฐานข้อมูล ประกอบไปด้วย username และ password = hashedPassword
    const newUser = new User({ username, password: hashedPassword });
    // ใช้สั่ง newUser.save() เพื่อบันทึกข้อมูล newUser ลง Database .save เป็น Method ของ Mongoose ใช้สำหรับเซฟข้อมูลลง Database
    await newUser.save();
    // เสร็จแล้ว Return NextResponse.json({}) message:string , และ status:number
    return NextResponse.json(
      { message: "User registered successfully" },
      { status: 201 }
    );
  } catch (error) {
    // catch ดักจับ error แล้วให้ล่อก error และ return error:string , status:number
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
