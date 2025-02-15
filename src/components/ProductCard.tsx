'use client'
import Image from "next/image"
import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Item } from "@/types/item"
import { useState } from "react"
import { useAdminStore } from "@/store/adminStore"
import { useAuthStore } from "@/store/authStore"
import { useRouter } from "next/navigation"

export default function ProductCard({ $id, name, price, }: Item) {
  return (
    <div className="group relative w-full max-w-sm overflow-hidden rounded-2xl border border-gray-300 bg-gradient-to-br from-white to-gray-100 shadow-lg transition-all hover:shadow-xl">
    
    <div className="aspect-square w-full overflow-hidden rounded-t-2xl">
        <Image
          src={ "/placeholder.svg"}
          alt={name}
          width={300}
          height={300}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-5 space-y-3">
        <h3 className="ml-1 text-2xl font-bold text-gray-700 capitalize tracking-wide">{name}</h3>
      
        <span className="text-3xl font-bold text-black ">&#8377;{price}/-</span>
          <Button className="flex items-center gap-2 rounded-lg bg-gradient-to-r hover:bg-gradient-to-l active:bg-gradient-to-l from-green-400 to-teal-600 px-5 py-6 text-sm font-semibold text-white shadow-md active:to-teal-600 active:from-green-400 hover:to-teal-600 hover:from-green-400 active:scale-95 transition">
            <ShoppingCart className="h-4 w-4" />
            Add to Cart
          </Button>
        </div>
      </div>
  )
}

