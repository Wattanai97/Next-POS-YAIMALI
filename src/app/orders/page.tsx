"use client";
import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import mongoose from "mongoose";
interface Product {
  _id: mongoose.Types.ObjectId;
  name: string;
  price: number;
  category: "All" | "Foods" | "Drinks";
}
type FilterType = "All" | "Foods" | "Drinks";
export default function POSPage() {
  const [products] = useState<Product[]>([
    {
      _id: new mongoose.Types.ObjectId(),
      category: "Foods",
      name: "ก๋วยเตี๋ยวเนื้อ ธรรมดา",
      price: 65,
    },
    {
      _id: new mongoose.Types.ObjectId(),
      category: "Foods",
      name: "ก๋วยเตี๋ยวเนื้อ พิเศษ",
      price: 75,
    },
    {
      _id: new mongoose.Types.ObjectId(),
      category: "Foods",
      name: "ก๋วยเตี๋ยวหมู ธรรมดา",
      price: 65,
    },
    {
      _id: new mongoose.Types.ObjectId(),
      category: "Foods",
      name: "ก๋วยเตี๋ยวหมู พิเศษ",
      price: 75,
    },
    {
      _id: new mongoose.Types.ObjectId(),
      category: "Foods",
      name: "เกาเหลาหมู ธรรมดา",
      price: 65,
    },
    {
      _id: new mongoose.Types.ObjectId(),
      category: "Foods",
      name: "เกาเหลาหมู พิเศษ",
      price: 75,
    },
    {
      _id: new mongoose.Types.ObjectId(),
      category: "Foods",
      name: "เกาเหลาเนื้อ ธรรมดา",
      price: 70,
    },
    {
      _id: new mongoose.Types.ObjectId(),
      category: "Foods",
      name: "เกาเหลาเนื้อ พิเศษ",
      price: 80,
    },
    {
      _id: new mongoose.Types.ObjectId(),
      category: "Foods",
      name: "ข้าวกะเพราเนื้อ ธรรมดา",
      price: 70,
    },
    {
      _id: new mongoose.Types.ObjectId(),
      category: "Foods",
      name: "ข้าวกะเพราเนื้อ พิเศษ",
      price: 80,
    },
    {
      _id: new mongoose.Types.ObjectId(),
      category: "Foods",
      name: "เส้น+กะเพราเนื้อ ธรรมดา",
      price: 70,
    },
    {
      _id: new mongoose.Types.ObjectId(),
      category: "Foods",
      name: "เส้น+กะเพราเนื้อ พิเศษ",
      price: 80,
    },
    {
      _id: new mongoose.Types.ObjectId(),
      category: "Foods",
      name: "ข้าวสวย",
      price: 10,
    },
    {
      _id: new mongoose.Types.ObjectId(),
      category: "Foods",
      name: "ไข่ดาว",
      price: 10,
    },
    {
      _id: new mongoose.Types.ObjectId(),
      category: "Foods",
      name: "กากเจียว",
      price: 20,
    },
    {
      _id: new mongoose.Types.ObjectId(),
      category: "Drinks",
      name: "ชาไทย",
      price: 49,
    },
    {
      _id: new mongoose.Types.ObjectId(),
      category: "Drinks",
      name: "ชาไทยปั่น",
      price: 59,
    },
    {
      _id: new mongoose.Types.ObjectId(),
      category: "Drinks",
      name: "ชาเขียว",
      price: 49,
    },
    {
      _id: new mongoose.Types.ObjectId(),
      category: "Drinks",
      name: "ชาเขียวปั่น",
      price: 59,
    },
    {
      _id: new mongoose.Types.ObjectId(),
      category: "Drinks",
      name: "นมสดยายมะลิ",
      price: 49,
    },
    {
      _id: new mongoose.Types.ObjectId(),
      category: "Drinks",
      name: "นมสดยายมะลิปั่น",
      price: 59,
    },
    {
      _id: new mongoose.Types.ObjectId(),
      category: "Drinks",
      name: "โกโก้",
      price: 49,
    },
    {
      _id: new mongoose.Types.ObjectId(),
      category: "Drinks",
      name: "โกโก้ปั่น",
      price: 59,
    },
    {
      _id: new mongoose.Types.ObjectId(),
      category: "Drinks",
      name: "น้ำเปล่า",
      price: 10,
    },
    {
      _id: new mongoose.Types.ObjectId(),
      category: "Drinks",
      name: "น้ำโค้ก",
      price: 20,
    },
  ]);

  const [cart, setCart] = useState<{ product: Product; quantity: number }[]>(
    []
  );
  const [filterType, setFilterType] = useState<FilterType>("All");
  const [activeButton, setActiveButton] = useState<FilterType>("All");
  const [loading, setLoading] = useState<boolean>(false);

  const handleClickActiveButton = (type: FilterType) => {
    setActiveButton(type);
    setFilterType(type);
  };

  // ✅ ใช้ useMemo เพื่อกรอง product ตาม filterType
  const filteredProducts = useMemo(() => {
    return products.filter(
      (p) => filterType === "All" || p.category === filterType
    );
  }, [products, filterType]);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product._id === product._id);
      if (existing) {
        return prev.map((item) =>
          item.product._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prev, { product, quantity: 1 }];
      }
    });
  };

  const deleteToCart = (productId: string) => {
    setCart((prev) => {
      return prev
        .map((item) =>
          item.product._id.equals(new mongoose.Types.ObjectId(productId)) // เปรียบเทียบ ObjectId ด้วย .equals
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0); // ลบออกจาก cart ถ้า quantity เป็น 0
    });
  };

  const calculateTotal = () => {
    return cart.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  };
  const handleBuy = async () => {
    setLoading(true);
    if (cart.length === 0) return alert("Cart is empty!");
    const BASE_API_URL =
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
    const Confirm = confirm(" ยืนยันการขายใช่ไหม ?");
    if (Confirm) {
      try {
        // เตรียมข้อมูล order ที่จะส่งไปยัง API
        const orderData = {
          items: cart.map((item) => ({
            product: item.product.name, // ใช้ name แทน ObjectId
            quantity: item.quantity,
            price: item.product.price,
            category: item.product.category, // ส่งจำนวนของสินค้า
          })),
          total: calculateTotal(), // คำนวณยอดรวม
        };

        // ส่งข้อมูลไปที่ API
        const res = await fetch(`${BASE_API_URL}/api/orders`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(orderData),
        });

        // ถ้า API ส่งกลับว่าไม่โอเค ให้แสดงข้อผิดพลาด
        if (!res.ok) throw new Error("Failed to place order");

        alert("Order placed successfully!");
        setCart([]); // เคลียร์ cart หลังจากซื้อเสร็จ
      } catch (error) {
        console.error(error);
        alert("Error placing order");
      } finally {
        setLoading(false);
      }
    } else {
      return null;
    }
  };
  if (loading) {
    return (
      <p className="text-center my-4 text-3xl font-bold text-white">
        Loading...
      </p>
    );
  }
  return (
    <div className="px-4">
      {/* FilterType */}
      <div className="xxs:container xxs:mx-auto mt-2.5 mx-2.5">
        {(["All", "Foods", "Drinks"] as FilterType[]).map((type) => (
          <button
            key={type}
            onClick={() => handleClickActiveButton(type)}
            className={`xxs:px-2 xxs:py-0.5 py mx-0.5 py-1 bg-slate-950 text-white rounded-md transition-all
            ${
              activeButton === type
                ? "bg-opacity-50 shadow-inner shadow-cyan-200/100 underline decoration-white"
                : "bg-opacity-100"
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Menu and Cart */}
      <div className="flex justify-around me-6">
        <span className="mx-3 text-lg font-semibold text-white">Menu</span>
        <span className="text-lg font-semibold text-white xxs:hidden sm:block">
          Cart
        </span>
      </div>

      {/* Container สำหรับ Menu และ Cart */}
      <div className="xxs:flex xxs:flex-col sm:grid sm:grid-cols-2 gap-4 mt-4">
        {/* Menu Section (เพิ่ม grid-cols-1 md:grid-cols-2) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-0.5">
          {filteredProducts.map((product) => (
            <Card key={product._id.toString()} className="p-0.5 m-0.5">
              <CardContent>
                <h3>{product.name}</h3>
                <div className="flex justify-between">
                  <p>฿{product.price}</p>
                  <button
                    className="bg-slate-900 rounded-md px-2 py-0.5 text-white"
                    onClick={() => addToCart(product)}
                  >
                    +
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Cart Section */}
        <div className="flex flex-col min-h-0 max-h-[400px] overflow-auto border-2 border-white rounded-md p-2 ">
          <div className="flex justify-center">
            <span className="text-lg font-semibold text-white xxs:block sm:hidden">
              Cart
            </span>
          </div>
          {cart.map((item) => (
            <Card
              key={item.product._id.toString()}
              className="p-0.5 mx-4 my-0.5"
            >
              <CardContent>
                <h3>{item.product.name}</h3>
                <div className="flex justify-between">
                  <p>
                    {item.quantity} x ฿{item.product.price}
                  </p>
                  <button
                    className="bg-black text-white px-2 mx-0.5 rounded-md mb-0.5"
                    onClick={() => deleteToCart(item.product._id.toString())}
                  >
                    ลบ
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
          {cart.length > 0 && (
            <div className="m-2.5 flex">
              <p className="text-lg font-bold text-slate-200">
                Total: ฿{calculateTotal()}
              </p>
              <button
                onClick={() => {
                  handleBuy();
                }}
                className="bg-black mx-2 text-white bg-opacity-50 px-3 font-bold py-0.5 rounded-md dark:border dark:bordor-white dark:border-solid"
              >
                Buy
              </button>
              <button
                className="bg-red-600 text-white bg-opacity-50 px-3 font-bold py-0.5 rounded-md dark:border dark:bordor-white dark:border-solid"
                onClick={() => {
                  setCart([]);
                }}
              >
                Clear
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
