import { RequestList } from "@/components/request-list";
import type { Request } from "@/types/request";
import axios from "axios";

// This is a mock function. In a real app, you'd fetch this data from a database.
async function getRequests(): Promise<Request[]> {
  // Simulate a delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return [
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      status: "pending",
      createdAt: "2023-06-01T12:00:00Z",
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      status: "approved",
      createdAt: "2023-06-02T14:30:00Z",
    },
    {
      id: "3",
      name: "Bob Johnson",
      email: "bob@example.com",
      status: "pending",
      createdAt: "2023-06-03T09:15:00Z",
    },
    {
      id: "4",
      name: "Alice Brown",
      email: "alice@example.com",
      status: "rejected",
      createdAt: "2023-06-04T16:45:00Z",
    },
    {
      id: "5",
      name: "Charlie Davis",
      email: "charlie@example.com",
      status: "pending",
      createdAt: "2023-06-05T11:20:00Z",
    },
  ];
}

export default async function AdminPage() {
 //const requests = await getRequests();
  const requests:[Request] = await axios.get("/api/admin");

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard - Requests</h1>
      <RequestList requests={requests} />
    </div>
  );
}
