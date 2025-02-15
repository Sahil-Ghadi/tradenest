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
      console.log("Fetched Data:", data.data.documents); // Debugging
      console.log("Data Type:", typeof data.data.documents);
      console.log("Is Array?", Array.isArray(data.data.documents));

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
    <main className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">Featured Products</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {items.length > 0 ? (
          items.map((item: Item) => <div key={item.$id} ><ProductCard {...item} /></div>)
        ) : (
          <p>No products available.</p>
        )}
      </div>
      </main>
  );
};

