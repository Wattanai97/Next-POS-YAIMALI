export interface Product {
  productId: string;
  name: string;
  price: number;
  category: "All" | "Foods" | "Drinks";
}

export const products: Product[] = [
  {
    productId: "Noodle-Beef",
    category: "Foods",
    name: "ก๋วยเตี๋ยวเนื้อ ธรรมดา",
    price: 65,
  },
  {
    productId: "Noodle-Beef-xl",
    category: "Foods",
    name: "ก๋วยเตี๋ยวเนื้อ พิเศษ",
    price: 75,
  },
  {
    productId: "Noodle-Pork",
    category: "Foods",
    name: "ก๋วยเตี๋ยวหมู ธรรมดา",
    price: 65,
  },
  {
    productId: "Noodle-Pork-xl",
    category: "Foods",
    name: "ก๋วยเตี๋ยวหมู พิเศษ",
    price: 75,
  },
  {
    productId: "Soup-Pork",
    category: "Foods",
    name: "เกาเหลาหมู ธรรมดา",
    price: 65,
  },
  {
    productId: "Soup-Pork-xl",
    category: "Foods",
    name: "เกาเหลาหมู พิเศษ",
    price: 75,
  },
  {
    productId: "Soup-Beef",
    category: "Foods",
    name: "เกาเหลาเนื้อ ธรรมดา",
    price: 70,
  },
  {
    productId: "Soup-Beef-xl",
    category: "Foods",
    name: "เกาเหลาเนื้อ พิเศษ",
    price: 80,
  },
  {
    productId: "Kapow-Beef",
    category: "Foods",
    name: "ข้าวกะเพราเนื้อ ธรรมดา",
    price: 70,
  },
  {
    productId: "Kapow-Beef-xl",
    category: "Foods",
    name: "ข้าวกะเพราเนื้อ พิเศษ",
    price: 80,
  },
  {
    productId: "Kapow-Pork",
    category: "Foods",
    name: "ข้าวกะเพราหมู ธรรมดา",
    price: 65,
  },
  {
    productId: "Kapow-Pork-xl",
    category: "Foods",
    name: "ข้าวกะเพราหมู พิเศษ",
    price: 75,
  },
  {
    productId: "Noodle-Kapow-Beef",
    category: "Foods",
    name: "เส้น+กะเพราเนื้อ ธรรมดา",
    price: 70,
  },
  {
    productId: "Noodle-Kapow-Beef-xl",
    category: "Foods",
    name: "เส้น+กะเพราเนื้อ พิเศษ",
    price: 80,
  },
  {
    productId: "Noodle-Kapow-Pork",
    category: "Foods",
    name: "เส้น+กะเพราหมู ธรรมดา",
    price: 65,
  },
  {
    productId: "Noodle-Kapow-Pork-xl",
    category: "Foods",
    name: "เส้น+กะเพราหมู พิเศษ",
    price: 75,
  },
  {
    productId: "Rice",
    category: "Foods",
    name: "ข้าวสวย",
    price: 10,
  },
  {
    productId: "Egg",
    category: "Foods",
    name: "ไข่ดาว",
    price: 10,
  },
  {
    productId: "Gag-jiew",
    category: "Foods",
    name: "กากเจียว",
    price: 20,
  },
  {
    productId: "Thai-Tea",
    category: "Drinks",
    name: "ชาไทย",
    price: 49,
  },
  {
    productId: "Thai-Tea-Fleppe",
    category: "Drinks",
    name: "ชาไทยปั่น",
    price: 59,
  },
  {
    productId: "Green-Tea",
    category: "Drinks",
    name: "ชาเขียว",
    price: 49,
  },
  {
    productId: "Green-Tea-Fleppe",
    category: "Drinks",
    name: "ชาเขียวปั่น",
    price: 59,
  },
  {
    productId: "Nom-Yaimali",
    category: "Drinks",
    name: "นมสดยายมะลิ",
    price: 49,
  },
  {
    productId: "Nom-Yaimali-Fleppe",
    category: "Drinks",
    name: "นมสดยายมะลิปั่น",
    price: 59,
  },
  {
    productId: "Coco",
    category: "Drinks",
    name: "โกโก้",
    price: 49,
  },
  {
    productId: "Coco-Fleppe",
    category: "Drinks",
    name: "โกโก้ปั่น",
    price: 59,
  },
  {
    productId: "Water",
    category: "Drinks",
    name: "น้ำเปล่า",
    price: 10,
  },
  {
    productId: "Coke",
    category: "Drinks",
    name: "น้ำโค้ก",
    price: 20,
  },
];
