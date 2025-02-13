"use client";
import { useState, useEffect } from "react";
import ProductCard from "@/components/ProductCard";
import { useAdminStore } from "@/store/adminStore";
import { Item } from "@/types/item";

export default function Home() {
  const {GetItems} = useAdminStore()
  const [items, setItems] = useState([]);

  const fetchItems = async () => {
    try {
      const data= await GetItems();
      setItems(data.data);
      console.log("items fetched ", items);
    } catch (error) {
      console.log("error in fetching items ", error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [items]);

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">Featured Products</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {items.map((item: any) => (
          <ProductCard key={item.id} {...item} />
        ))}
      </div>
    </main>
  );
}
