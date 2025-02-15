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
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-gray-900">Rs.{price}</span>
          <Button size="sm">
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  )
}

