"use client";
import { useState, useEffect } from "react";
import ProductCard from "@/components/ProductCard";
import { useAdminStore } from "@/store/adminStore";
import { Item } from "@/types/item";
import { useAuthStore } from "@/store/authStore";
import { title } from "process";

export default function Home() {
  const { GetItems } = useAdminStore();
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // Loading state

  const user = useAuthStore();

  const fetchItems = async () => {
    try {
      setLoading(true); // Start loading
      const data = await GetItems();

      setItems(Array.isArray(data.data.documents) ? data.data.documents : []);
    } catch (error) {
      console.error("Error fetching items:", error);
      setItems([]);
    } finally {
      setLoading(false); // Stop loading after fetch completes
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  if (!user)
    return (
      <h1 className="mb-5 pt-5 sm:ml-4 text-4xl text-black sm:text-start text-center font-bold">
        Login to use the Website
      </h1>
    );

  return (
    <main className="sm:px-5 bg-white h-screen">
      <h1 className="mb-5 pt-5 ml-6 sm:ml-5 text-3xl sm:text-4xl text-black text-start font-bold">
        Featured Products
      </h1>

      {loading ? (
        <div className="flex mt-20 justify-center items-center h-40">
          <span className="animate-spin w-10 h-10 border-4 border-gray-900 border-t-transparent rounded-full"></span>
        </div>
      ) : (
        <div className="px-5 pb-5 grid justify-center sm:justify-start gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.length > 0 ? (
            items.map((item: Item) => (
              <div  key={item.$id}>
                <ProductCard {...item}  />
              </div>
            ))
          ) : (
            <p className="text-gray-900">No products available.</p>
          )}
        </div>
      )}
    </main>
  );
}
