"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useAdminStore } from "@/store/adminStore"

export default function AddItemForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("");
  const {CreateItem} = useAdminStore()
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    console.log(formData);
    const name = formData.get("name");
    const price = formData.get("price");
    if(!name || !price){
     setError(() => "Please fill out all fields");
     return;
    }
    setIsLoading(() => true);
    setError(() => "");

  //  await CreateItem()
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div>
        <Label htmlFor="name">Item Name</Label>
        <Input id="name" name="name" required />
      </div>
      <div>
        <Label htmlFor="price">Price</Label>
        <Input id="price" name="price" type="number" step="0.01" required />
      </div>
      <div>
        <Label htmlFor="image">Item Image</Label>
        <Input id="image" name="image" type="file" accept="image/*" required />
      </div>
      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Adding..." : "Add Item"}
      </Button>
    </form>
  )
}

