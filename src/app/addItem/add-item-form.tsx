"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useAuthStore } from "@/store/authStore"
import axios from "axios"

export default function AddItemForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("");
  const [data,setData] = useState({
    name: "",
    price: ""
  })
  const router = useRouter()
  const {user} = useAuthStore();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if(!data.name || !data.price){
     setError(() => "Please fill out all fields");
     return;
    }
    setIsLoading(() => true);
    setError(() => "");
    try {
      console.log("sending");
      
      const response = await axios.post("/api/admin/additem", {
        name: data.name,
        price: Number(data.price),
        sellerName: user?.name
      })

      if (!response.data.success) {
        setError(response.data.message || "Failed to add item")
        return
      }

      console.log("Item added:", response.data)
      router.push("/item")
    } catch (error) {
      console.error("Error in adding item:", error)
      setError("Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div>
        <Label htmlFor="name">Item Name</Label>
        <Input id="name" name="name" required
        value={data.name}
        onChange={(e) => setData({ ...data, name: e.target.value })} />
      </div>
      <div>
        <Label htmlFor="price">Price</Label>
        <Input id="price" name="price" type="number" step="0.01" required 
        value={data.price}
        onChange={(e) => setData({ ...data, price: e.target.value })}/>
      </div>
      {/* <div>
        <Label htmlFor="image">Item Image</Label>
        <Input id="image" name="image" type="file" accept="image/*" required />
      </div> */}
      <Button  className="bg-blue-800" type="submit" disabled={isLoading}>
        {isLoading ? "Adding..." : "Add Item"}
      </Button>
    </form>
  )
}

