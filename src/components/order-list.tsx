"use client";
import { useState } from "react";
import type { Request } from "@/types/request";
import { Button } from "@/components/ui/button";
import { useAdminStore } from "@/store/adminStore";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface RequestListProps {
  requests: Request[];
}

export function OrderList({ requests: initialRequests }: RequestListProps) {
  const [requests, setRequests] = useState<Request[]>(initialRequests);
  return (
<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
  {requests.map((request, index) => (
    <Card key={request.$id || `fallback-key-${index}`}>
      <CardHeader>
        <CardTitle className="text-2xl">{request.Itemname}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">Seller: {request.sellerName}</p>
        <p className="text-sm text-muted-foreground">Price: Rs. {request.price}</p>
      </CardContent>
      <CardFooter className="flex justify-items-center">
         <div 
         className={`px-3 min-w-full py-2 rounded-full text-white text-center text-xl font-medium ${
            request.status === 'APPROVE'
            ? "bg-green-200"
            :request.status === 'REJECT'
            ? "bg-red-200"
            : "bg-gray-200"
         } `}
         >{request.status}</div>
      </CardFooter>
    </Card>
  ))}
</div>

  );
}
