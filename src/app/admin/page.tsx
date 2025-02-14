"use client";

import { useEffect, useState } from "react";
import { RequestList } from "@/components/request-list";
import type { Request } from "@/types/request";
import { useAdminStore } from "@/store/adminStore";

export default function AdminPage() {
  const { GetRequest } = useAdminStore();
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRequests() {
      setLoading(true);
      setError(null);

      const data = await GetRequest();

      if (data.success) {
        setRequests(Array.isArray(data.data.documents) ? data.data.documents : []);
      } else {
        setError(data.error?.message || "Failed to fetch requests");
      }

      setLoading(false);
    }
    fetchRequests();
  }, [GetRequest]);

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard - Requests</h1>

      {loading ? (
        <p className="text-center text-gray-500">Loading requests...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : requests.length > 0 ? (
        <RequestList requests={requests} />
      ) : (
        <p className="text-center text-gray-500">No requests found.</p>
      )}
    </div>
  );
}
