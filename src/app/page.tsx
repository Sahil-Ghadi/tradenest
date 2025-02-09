'use client'
import axios from "axios";
import { useState,useEffect } from "react";

export default function Home() {

  interface itemSlot{
    itemName:string,
    price:string,
  }

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
    <><div className="max-h-screen bg-blue-500">
       {items.map((item:itemSlot) => (
        <div className="rounded-md bg-pink-200" key={item.itemName}>
          <img src="" alt="" />
          <p>{item.itemName}</p>
          <p>{item.price}</p>
        </div>
       ))}
      </div>
    </>
  )
}
