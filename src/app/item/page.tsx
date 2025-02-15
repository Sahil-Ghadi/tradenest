"use client";
import { useState, useEffect } from "react";
import ProductCard from "@/components/ProductCard";
import { Item } from "@/types/item";
import axios from "axios";

export default function Home() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchItems = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await axios.get("/api/items");
        console.log(data.data.data.documents);
        console.log(data.data.success);
        
        if (isMounted) {
          if (data.data.success) {
            setItems(data.data.documents || []);
          } else {
            setError("Failed to load products.");
          }
        }
      } catch (error) {
        if (isMounted) {
          setError("An error occurred while fetching products.");
        }
        console.error("Error fetching items:", error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchItems();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">Featured Products</h1>

      {loading ? (
        <p className="text-lg text-gray-600 animate-pulse">Loading products...</p>
      ) : error ? (
        <p className="text-lg text-red-600">{error}</p>
      ) : items.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((item: Item) => (
            <div key={item.$id}>
              <ProductCard {...item} />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-lg">🚀 No products available. Check back soon!</p>
      )}
    </main>
  );
}
