'use client'
import Image from "next/image"
import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Item } from "@/types/item"
import { useState } from "react"
import { useAdminStore } from "@/store/adminStore"
import { useRouter } from "next/navigation"

export default function ProductCard({ $id, name, price, sellerId, }: Item) {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("");
    const {Buyitem} = useAdminStore()
    const router = useRouter()
  const buyItem = async () => {

    if(!$id){
     console.log("product nott found");
     ;
     return;
    }
    setIsLoading(() => true);
    setError(() => "");

    const res = await Buyitem($id,name.toString(),Number(price),sellerId)
    console.log(res);
    
    if (res.error) {
      setError(() => res.error!.message);
    } 
    setIsLoading(() => false);
    router.push('/item')
  }
  return (
    <div className="group relative overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md transition-all hover:shadow-lg">
      <div className="aspect-square overflow-hidden">
        <Image
          src={ "/placeholder.svg"}
          alt={name}
          width={300}
          height={300}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <h3 className="mb-2 text-lg font-semibold text-gray-900">{name}</h3>
        <p className="mb-2 text-sm text-gray-500 line-clamp-2">{sellerId}</p>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-gray-900">Rs.{price}</span>
          <Button size="sm" onClick={buyItem}>
            <ShoppingCart className="mr-2 h-4 w-4" />
            BUY
          </Button>
        </div>
      </div>
    </div>
  )
}

