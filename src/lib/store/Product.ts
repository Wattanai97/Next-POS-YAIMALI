import { v4 as uuidv4 } from "uuid";

export interface Product {
  _id: string;
  name: string;
  price: number;
  category: "All" | "Foods" | "Drinks";
}

export const products: Product[] = [
  {
    _id: uuidv4(),
    category: "Foods",
    name: "ก๋วยเตี๋ยวเนื้อ ธรรมดา",
    price: 65,
  },
  {
    _id: uuidv4(),
    category: "Foods",
    name: "ก๋วยเตี๋ยวเนื้อ พิเศษ",
    price: 75,
  },
  {
    _id: uuidv4(),
    category: "Foods",
    name: "ก๋วยเตี๋ยวหมู ธรรมดา",
    price: 65,
  },
  {
    _id: uuidv4(),
    category: "Foods",
    name: "ก๋วยเตี๋ยวหมู พิเศษ",
    price: 75,
  },
  {
    _id: uuidv4(),
    category: "Foods",
    name: "เกาเหลาหมู ธรรมดา",
    price: 65,
  },
  {
    _id: uuidv4(),
    category: "Foods",
    name: "เกาเหลาหมู พิเศษ",
    price: 75,
  },
  {
    _id: uuidv4(),
    category: "Foods",
    name: "เกาเหลาเนื้อ ธรรมดา",
    price: 70,
  },
  {
    _id: uuidv4(),
    category: "Foods",
    name: "เกาเหลาเนื้อ พิเศษ",
    price: 80,
  },
  {
    _id: uuidv4(),
    category: "Foods",
    name: "ข้าวกะเพราเนื้อ ธรรมดา",
    price: 70,
  },
  {
    _id: uuidv4(),
    category: "Foods",
    name: "ข้าวกะเพราเนื้อ พิเศษ",
    price: 80,
  },
  {
    _id: uuidv4(),
    category: "Foods",
    name: "เส้น+กะเพราเนื้อ ธรรมดา",
    price: 70,
  },
  {
    _id: uuidv4(),
    category: "Foods",
    name: "เส้น+กะเพราเนื้อ พิเศษ",
    price: 80,
  },
  {
    _id: uuidv4(),
    category: "Foods",
    name: "ข้าวสวย",
    price: 10,
  },
  {
    _id: uuidv4(),
    category: "Foods",
    name: "ไข่ดาว",
    price: 10,
  },
  {
    _id: uuidv4(),
    category: "Foods",
    name: "กากเจียว",
    price: 20,
  },
  {
    _id: uuidv4(),
    category: "Drinks",
    name: "ชาไทย",
    price: 49,
  },
  {
    _id: uuidv4(),
    category: "Drinks",
    name: "ชาไทยปั่น",
    price: 59,
  },
  {
    _id: uuidv4(),
    category: "Drinks",
    name: "ชาเขียว",
    price: 49,
  },
  {
    _id: uuidv4(),
    category: "Drinks",
    name: "ชาเขียวปั่น",
    price: 59,
  },
  {
    _id: uuidv4(),
    category: "Drinks",
    name: "นมสดยายมะลิ",
    price: 49,
  },
  {
    _id: uuidv4(),
    category: "Drinks",
    name: "นมสดยายมะลิปั่น",
    price: 59,
  },
  {
    _id: uuidv4(),
    category: "Drinks",
    name: "โกโก้",
    price: 49,
  },
  {
    _id: uuidv4(),
    category: "Drinks",
    name: "โกโก้ปั่น",
    price: 59,
  },
  {
    _id: uuidv4(),
    category: "Drinks",
    name: "น้ำเปล่า",
    price: 10,
  },
  {
    _id: uuidv4(),
    category: "Drinks",
    name: "น้ำโค้ก",
    price: 20,
  },
];
