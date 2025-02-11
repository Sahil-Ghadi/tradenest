"use client"

import axios from "axios";
import { useState,useEffect } from "react";
import ProductCard from "@/components/ProductCard"

export default function Home() {

  // interface itemSlot {
  //   _id:string,
  //   name:string,
  //   price: number,
  //   imageUrl:string,
  // }

  const [items,setItems] = useState([])

  const fetchItems = async () => {
   try {
     const res = await axios.get('/api/items')
     setItems(res.data)
     console.log("items fetched ",res.data);
   } catch (error) {
    console.log("error in fetching items ",error);
   }
  }

  useEffect(() => {
   fetchItems()
  }, [items])
  
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">Featured Products</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {items.map((item: any) => (
          <ProductCard key={item._id} {...item} />
        ))}
      </div>
    </main>
  )
}
