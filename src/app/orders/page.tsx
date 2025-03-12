"use client";
import { useState, useMemo } from "react";
// import { Button } from "@/components/ui/button";
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
      price: 70,
    },
    {
      _id: new mongoose.Types.ObjectId(),
      category: "Foods",
      name: "เกาเหลาหมู พิเศษ",
      price: 80,
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
      name: "ข้าวสวย",
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
      name: "ชาเขียว",
      price: 49,
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
      name: "โกโก้",
      price: 49,
    },
    {
      _id: new mongoose.Types.ObjectId(),
      category: "Drinks",
      name: "น้ำเปล่า",
      price: 10,
    },
  ]);

  const [cart, setCart] = useState<{ product: Product; quantity: number }[]>(
    []
  );
  const [filterType, setFilterType] = useState<FilterType>("All");
  const [activeButton, setActiveButton] = useState<FilterType>("All");

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
    if (cart.length === 0) return alert("Cart is empty!");
    const BASE_API_URL = process.env.NEXTAUTH_URL || "http://localhost:3000";
    try {
      // เตรียมข้อมูล order ที่จะส่งไปยัง API
      const orderData = {
        items: cart.map((item) => ({
          product: item.product.name, // ใช้ name แทน ObjectId
          quantity: item.quantity, // ส่งจำนวนของสินค้า
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
    }
  };

  return (
    <div className="p-4">
      {/* FilterType */}
      <div className="mt-2.5 mx-2.5">
        {(["All", "Foods", "Drinks"] as FilterType[]).map((type) => (
          <button
            key={type}
            onClick={() => handleClickActiveButton(type)}
            className={`px-4 mx-0.5 py-1 bg-slate-950 text-white rounded-md transition-all
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
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div>
          <h2 className="mx-3 text-lg font-semibold">Menu</h2>
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
        <div>
          <h2 className="text-lg font-semibold">Cart</h2>
          {cart.map((item) => (
            <Card key={item.product._id.toString()} className="p-0.5 m-2">
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
            <div className="mx-2.5 flex">
              <p className="text-lg font-bold">Total: ฿{calculateTotal()}</p>
              <button
                onClick={() => {
                  handleBuy();
                }}
                className="bg-black mx-2 text-white bg-opacity-50 px-3 font-bold py-0.5 rounded-md"
              >
                Buy
              </button>
              <button
                className="bg-red-600  text-white bg-opacity-50 px-3 font-bold py-0.5 rounded-md"
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
