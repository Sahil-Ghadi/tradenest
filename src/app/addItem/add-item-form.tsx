"use client"

import { useState,useRef } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useAdminStore } from "@/store/adminStore"

export default function AddItemForm() {

  interface itemData {
    name:string,
    price:string
  }

  const [fileName, setFileName] = useState("No file chosen");
  const fileInputRef = useRef<HTMLInputElement | null>(null);
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
        <Input 
        className="pl-3 w-[350px] h-[42px] py-2 mb-4 border bg-gray-100 rounded-xl outline-gray-300"
        id="name" name="name" required
        value={data.name}
        placeholder="Item Name"
        onChange={(e) => setData({ ...data, name: e.target.value })} />
      </div>
      <div>
        <Input 
        className="pl-3 w-[350px] h-[42px] py-2 mb-4 border bg-gray-100 rounded-xl outline-gray-300"
        id="price" name="price" type="number" step="1" required 
        value={data.price}
        placeholder="Price &#8377;"
        onChange={(e) => setData({ ...data, price: e.target.value })}/>
      </div>
      <div className="flex flex-col">

      {/* Hidden File Input */}
      <input
        id="image"
        name="image"
        type="file"
        className="hidden"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];
          setFileName(file ? file.name : "No file chosen");
        }}
        ref={fileInputRef}
      />

      {/* Custom File Upload Button */}
      <div className="overflow-hidden flex items-center w-[350px] h-[42px] mb-4 border bg-gray-100 rounded-xl outline-gray-300">
        <button
          type="button"
          className="bg-blue-600 text-white px-4 py-2 rounded-l-xl hover:bg-blue-700 transition"
          onClick={() => fileInputRef.current?.click()}
        >
          Choose File
        </button>
        <span className="px-3 text-gray-600 truncate">{fileName}</span>
      </div>
    </div>
      <Button 
      className="mt-5 w-[300px] h-[42px] flex justify-center items-center py-2 px-4 rounded-full shadow-sm text-sm font-medium text-white bg-blue-600 dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      type="submit" disabled={isLoading}>{isLoading?"Adding Item" : "Add Item"}
      </Button>
    </form>
  )
}

