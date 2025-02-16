"use client"
import Image from "next/image"
import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Item } from "@/types/item"
import { useEffect, useState } from "react"
import { useAdminStore } from "@/store/adminStore"
import { useAuthStore } from "@/store/authStore"
import { useRouter } from "next/navigation"

export default function ProductCard({ $id, name, price,sellerName ,status}: Item) {
  const { Buyitem,GetFile } = useAdminStore()
  const { user } = useAuthStore()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [url,setUrl] = useState<string>('/Cool-bg.jpg');

  useEffect(() => {
    const fetchFile = async () => {
      const data = await GetFile($id);
      if (data.success) {
        setUrl(data.data ?? "/Cool-bg.jpg" )
        console.log(url);
        
      } else {
        setUrl("/Cool-bg.jpg")
      }
    };

    fetchFile();
  
  }, [])
  

  const handleBuyItem = async () => {
    if (!user) {
      alert("Please log in to purchase an item.")
      return
    }

    setLoading(true)
    const response = await Buyitem($id)

    if (response.success) {
      alert("Item purchase request sent successfully!")
      router.push("/myOrders")// Refresh the page after purchase
    } else {
      alert("Failed to purchase item. Please try again.")
    }

    setLoading(false)
  }

  return (
    <div className="group relative w-full max-w-sm overflow-hidden rounded-2xl border border-gray-300 bg-gradient-to-br from-white to-gray-100 shadow-lg transition-all hover:shadow-xl">
      <div className="aspect-square w-full overflow-hidden rounded-t-2xl">
        <Image
          src={url}
          alt={name}
          width={400}
          height={300}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-4 space-y-3">
        <h3 className="ml-1 text-xl font-bold text-gray-700 capitalize tracking-wide">{name}</h3>
        <h3 className="ml-1 text-xl font-bold text-gray-700 capitalize tracking-wide">Sold by: {sellerName}</h3>
        <p>{status}</p>
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-black">&#8377;{price}/-</span>
          <Button
            className="flex items-center gap-2 rounded-lg bg-gradient-to-r hover:bg-gradient-to-l active:bg-gradient-to-l from-green-400 to-teal-600 px-5 py-6 text-sm font-semibold text-white shadow-md active:to-teal-600 active:from-green-400 hover:to-teal-600 hover:from-green-400 active:scale-95 transition"
            onClick={handleBuyItem}
            disabled={loading || status==="REQUESTED"}
          >
            <ShoppingCart className="h-4 w-4" />
            {loading ? "Processing..." : "Buy Item"}
          </Button>
        </div>
      </div>
    </div>
  )
}


