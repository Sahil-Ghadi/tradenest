'use client'
import Image from "next/image"
import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Item } from "@/types/item"
import { useState } from "react"
import axios from "axios"
import { useAuthStore } from "@/store/authStore"
import { useRouter } from "next/navigation"

export default function ProductCard({ $id, name, price, sellerName }: Item) {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    
    const { user } = useAuthStore()  // Ensure user is logged in
    const router = useRouter()

    const handlePurchase = async () => {
        if (!user) {
            setError("You must be logged in to buy items")
            return
        }
        setIsLoading(true)
        setError("")

        try {
            // Call the single API endpoint for buying and requesting
            const response = await axios.post("/api/purchase", {
                itemId: $id,
                itemName: name,
                sellerName,
                buyerName:user.name,
                price
            })

            console.log(response);
            
            // if (!response.data.success) {
            //     setError(response.data.message || "Purchase failed")
            //     return
            // }
            // console.log("Purchase & request success:", response.data)

            // // Navigate to items page
            // router.push('/item')
        } catch (error) {
            console.error("Error in purchase:", error)
            setError("Something went wrong. Please try again.")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="group relative overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md transition-all hover:shadow-lg">
            <div className="aspect-square overflow-hidden">
                <Image
                    src={"/Cool-bg.jpg"}
                    alt={name}
                    width={300}
                    height={300}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
            </div>
            <div className="p-4">
                <h3 className="mb-2 text-lg font-semibold text-gray-900">{name}</h3>
                <p className="mb-2 text-sm text-gray-500 line-clamp-2">{sellerName}</p>
                <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-gray-900">Rs.{price}</span>
                    
                    <Button size="sm" disabled={isLoading} onClick={handlePurchase}>
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        {isLoading ? "Processing..." : "BUY"}
                    </Button>
                </div>
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </div>
        </div>
    )
}
