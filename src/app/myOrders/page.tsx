"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { RequestList } from "@/components/request-list";
import type { Request } from "@/types/request";
import { OrderList } from "@/components/order-list";

export default function AdminPage() {
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRequests() {
      setLoading(true);
      setError(null);

      try {
        const  data  = await axios.get("/api/orders");
        console.log(data);
        
        // if (data.success) {
        //   setRequests(Array.isArray(data.data.documents) ? data.data.documents : []);
        // } else {
        //   setError(data.message || "Failed to fetch requests");
        // }
      } catch (error) {
        setError("An error occurred while fetching requests.");
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchRequests();
  }, []);

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard - Requests</h1>

      {loading ? (
        <p className="text-center text-gray-500 animate-pulse">Loading requests...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : requests.length > 0 ? (
        <OrderList requests={requests} />
      ) : (
        <p className="text-center text-gray-500">No requests found.</p>
      )}
    </div>
  );
}
