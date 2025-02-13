"use client"
import { RequestList } from "@/components/request-list";
import type { Request } from "@/types/request";
import axios from "axios";

// This is a mock function. In a real app, you'd fetch this data from a database.
async function getRequests(): Promise<Request[]> {
  // Simulate a delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return [
    {
      id: "string",
      Itemname: "string",
      itemId:"12",
      buyerName: "string",
      sellerId: "string",
      status: "PENDING",
      price: 100,
    },
  ];
}

export default async function AdminPage() {
  //const requests = await getRequests();
  const requests: [Request] = await axios.get("/api/admin");

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard - Requests</h1>
      <RequestList requests={requests} />
    </div>
  );
}
