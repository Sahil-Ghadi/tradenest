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
  const [file, setFile] = useState<File | null>(null);
  const [data,setData] = useState<itemData>({
    name: "",
    price: "",
  })
  const router = useRouter()
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const name = data.name
    const price = data.price
    console.log(data);
    
    if(!name || !price || !file){
     setError(() => "Please fill out all fields");
     return;
    }
    setIsLoading(() => true);
    setError(() => "");

   try {
     const res = await CreateItem(name.toString(),Number(price),file)
     console.log(res);
     
     if (res.error) {
       setError(() => res.error!.message);
     } 
    
     router.push('/')
   } catch (error) {
    setError("Failed to create item. Please try again.");
   }finally{
    setIsLoading(false)}
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col items-center justify-center p-8">
      <div>
        <Label className="text-white pl-2 mb-2 font-medium tracking-wide" htmlFor="name">Item Name</Label>
        <Input 
        className="pl-3 w-[350px] h-[42px] py-2 mb-4 border bg-gray-100 rounded-xl outline-gray-300"
        id="name" name="name" required
        value={data.name}
        onChange={(e) => setData({ ...data, name: e.target.value })} />
      </div>
      <div>
        <Label className="text-white pl-2 mb-2 font-medium tracking-wide" htmlFor="price">Price &#8377;</Label>
        <Input 
        className="pl-3 w-[350px] h-[42px] py-2 mb-4 border bg-gray-100 rounded-xl outline-gray-300"
        id="price" name="price" type="number" step="0.01" required 
        value={data.price}
        onChange={(e) => setData({ ...data, price: e.target.value })}/>
      </div>
      <div>
        <Label className="text-white pl-2 mb-2 font-medium tracking-wide" htmlFor="image">Item Image</Label>
        <Input id="image" name="image" type="file" className="pl-3 w-[350px] h-[42px] py-2 mb-4 border bg-gray-100 rounded-xl outline-gray-300" accept="image/*"  onChange={(e) => setFile(e.target.files?.[0] || null)} required />
      </div>
      <Button 
      className="w-[250px] mt-8 rounded-full"
      type="submit" disabled={isLoading}>{isLoading?"Adding Item" : "Add Item"}
      </Button>
    </form>
  )
}

