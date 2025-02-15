"use client";
import { useState, useEffect } from "react";
import ProductCard from "@/components/ProductCard";
import { useAdminStore } from "@/store/adminStore";
import { Item } from "@/types/item";

export default function Home() {
  const { GetItems } = useAdminStore();
  const [items, setItems] = useState<Item[]>([]);

  const fetchItems = async () => {
    try {
      const data = await GetItems();
      setItems(Array.isArray(data.data.documents) ? data.data.documents : []);
    } catch (error) {
      console.error("Error fetching items:", error);
      setItems([]);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

   return (
      <main className="sm:px-5 bg-white h-screen">
        <h1 className="mb-5 pt-5 sm:ml-4 text-4xl text-black sm:text-start text-center font-bold">
          Featured Products
        </h1>
        <div className="grid justify-center sm:justify-start  gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.length > 0 ? (
            items.map((item: Item) => (
              <div key={item.$id}>
                <ProductCard {...item} />
              </div>
            ))
          ) : (
            <p className="text-gray-900">No products available.</p>
          )}
        </div>
      </main>
    );
}
