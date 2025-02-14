"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useAdminStore } from "@/store/adminStore"
import { log } from "node:console"

export default function AddItemForm() {

  interface itemData {
    name:string,
    price:string
  }

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("");
  const {CreateItem} = useAdminStore()
  const [data,setData] = useState<itemData>({
    name: "",
    price: ""
  })
  const router = useRouter()
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const name = data.name
    const price = data.price
    console.log(data);
    
    if(!name || !price){
     setError(() => "Please fill out all fields");
     return;
    }
    setIsLoading(() => true);
    setError(() => "");

    const res = await CreateItem(name.toString(),Number(price))
    console.log(res);
    
    if (res.error) {
      setError(() => res.error!.message);
    } 
    setIsLoading(() => false);
    router.push('/item')
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
      <Button className="bg-blue-800" type="submit" disabled={isLoading}>
        {isLoading ? "Adding..." : "Add Item"}
      </Button>
    </form>
  )
}

