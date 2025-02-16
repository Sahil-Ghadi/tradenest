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
    <div className="mx-4 sm:mx-10">
      <div className="bg-gray-200 rounded-3xl mx-2 mt-6 sm:mt-10 h-auto min-h-[535px] flex flex-col border-4 border-dashed border-gray-400 p-4 sm:p-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-3 sm:mb-5">
          Admin Dashboard - Requests
        </h1>
  
        {loading ? (
          <p className="text-center text-gray-500 mt-2">Loading requests...</p>
        ) : error ? (
          <p className="text-center text-red-500 mt-4">{error}</p>
        ) : requests.length > 0 ? (
          <div className="overflow-x-auto">
            <RequestList requests={requests} />
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-4">No requests found.</p>
        )}
      </div>
    </div>
  );
}  