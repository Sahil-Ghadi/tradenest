'use client'
import Image from "next/image"
import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Item } from "@/types/item"
import { useState } from "react"
import { useAdminStore } from "@/store/adminStore"
import { useAuthStore } from "@/store/authStore"
import { useRouter } from "next/navigation"

export default function ProductCard({ $id, name, price, sellerId }: Item) {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    
    const { Buyitem, CreateReq } = useAdminStore()
    const { user } = useAuthStore()  // Ensure user is logged in
    const router = useRouter()

    const buyItem = async (id: string, price: number, sellerId: string) => {
        if (!id) {
            console.log("Product not found")
            return
        }
        if (!user) {
            setError("You must be logged in to buy items")
            return
        }

        setIsLoading(true)
        setError("")

        try {
            // Buy item first
            const res = await Buyitem(id)
            if (res.error) {
                setError(res.error.message)
                return
            }
            console.log("Purchase success:", res)

            // Create request only if the purchase was successful
            const reqs = await CreateReq(id, sellerId.toString())
            if (reqs.error) {
                setError(reqs.error.message)
                return
            }
            console.log("Request sent:", reqs)

            // Navigate to items page
            router.push('/item')
        } catch (error) {
            console.error("Error in buyItem:", error)
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
                <p className="mb-2 text-sm text-gray-500 line-clamp-2">{sellerId}</p>
                <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-gray-900">Rs.{price}</span>
                    
                    <Button size="sm" disabled={isLoading} onClick={() => buyItem($id, Number(price), sellerId)}>
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        {isLoading ? "Processing..." : "BUY"}
                    </Button>
                </div>
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </div>
        </div>
    )
}
