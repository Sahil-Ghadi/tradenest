"use client";

import { useEffect, useState } from "react";
import { RequestList } from "@/components/request-list";
import type { Request } from "@/types/request";
import { useAdminStore } from "@/store/adminStore";
import { OrderList } from "@/components/order-list";

export default function AdminPage() {
  const { GetMyOrders } = useAdminStore();
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
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
  }, [GetMyOrders]);

  return (
    <div className="container  mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">My Orders</h1>

      {loading ? (
        <p className="text-center text-gray-500">Loading my orders...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : requests.length > 0 ? (
        <OrderList requests={requests} />
      ) : (
        <p className="text-center text-gray-500">No orders made.</p>
      )}
    </div>
  );
}
