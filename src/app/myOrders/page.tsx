"use client";

import { useEffect, useState } from "react";
import type { Request } from "@/types/request";
import { useAdminStore } from "@/store/adminStore";
import { OrderList } from "@/components/order-list";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const { GetMyOrders } = useAdminStore();
  const {user} = useAuthStore()
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if(!user){
      router.push("/login")
    }
    async function fetchRequests() {
      setLoading(true);
      setError(null);

      const data = await GetMyOrders();

      if (data.success) {
        setRequests(Array.isArray(data.data.documents) ? data.data.documents : []);
      } else {
        setError(data.error?.message || "Failed to fetch requests");
      }

      setLoading(false);
    }
    fetchRequests();
  }, [GetMyOrders,router,user]);

  return (
    <div className="mx-4 sm:mx-10">
      <div className="bg-slate-700 rounded-3xl mt-6 sm:mt-7 h-auto min-h-[535px] flex flex-col border-4 border-blue-500 p-4 sm:p-6">
        <h1 className="text-2xl text-white sm:text-3xl font-bold text-center mb-3 sm:mb-5">
          Customer Dashboard - <span className="text-green-400">Orders</span>
        </h1>
  
        {loading ? (
          <p className="text-center text-gray-100 mt-2">Loading orders...</p>
        ) : error ? (
          <p className="text-center text-red-500 mt-4">{error}</p>
        ) : requests.length > 0 ? (
          <div className="overflow-x-auto">
            <OrderList requests={requests} />
          </div>
        ) : (
          <p className="text-center text-gray-100 mt-2">No orders found.</p>
        )}
      </div>
    </div>
  );
}

