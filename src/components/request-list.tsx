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
import axios from "axios";

interface RequestListProps {
  requests: Request[];
}

export function RequestList({ requests: initialRequests }: RequestListProps) {
  const [requests, setRequests] = useState<Request[]>(initialRequests);
  const [pendingAction, setPendingAction] = useState<{ id: string; type: "approve" | "reject" } | null>(null);

  const handleApprove = async (id: string, itemId: string,buyerName:string) => {
    try {
      setPendingAction({ id, type: "approve" });

      const { data } = await axios.post("/api/admin/approve", {
        reqId: id,
        itemId,
      });

      if (!data.success) throw new Error(data.message || "Approval failed")
      // ✅ Update UI after successful approval
      setRequests((prevRequests) =>
        prevRequests.map((req) =>
          req.$id === id ? { ...req, status: "APPROVE" } : req
        )
      );

      console.log("Approved successfully");
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setPendingAction(null);
    }
  };

  const handleReject = async (id: string, itemId: string) => {
    try {
      setPendingAction({ id, type: "reject" });

      const { data } = await axios.post("/api/admin/reject", {
        reqId: id,
        itemId,
      });

      if (!data.success) throw new Error(data.message || "Rejection failed");

      // ✅ Update UI after successful rejection
      setRequests((prevRequests) =>
        prevRequests.map((req) =>
          req.$id === id ? { ...req, status: "REJECT" } : req
        )
      );
      console.log("Rejected successfully");
    } catch (error: any) {
      console.log("reject success");

    } finally {
      setPendingAction(null);
    }
  };

  return (
<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
  {requests.map((request, index) => (
    <Card key={request.$id || `fallback-key-${index}`}>
      <CardHeader>
        <CardTitle className="text-2xl">{request.Itemname}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">Buyer: {request.buyerName}</p>
        <p className="text-sm text-muted-foreground">Status: {request.status}</p>
        <p className="text-sm text-muted-foreground">Price: Rs. {request.price}</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button className="bg-green-300"
          onClick={() => handleApprove(request.$id,request.itemId,request.buyerName)}
          disabled={request.status !== "PENDING" || (pendingAction?.id === request.$id && pendingAction.type === "approve")}
        >
          {pendingAction?.id === request.$id && pendingAction.type === "approve" ? "Processing..." : "Approve"}
        </Button>
        <Button className="bg-red-300"
          onClick={() => handleReject(request.$id, request.itemId)}
          disabled={request.status !== "PENDING" || (pendingAction?.id === request.$id && pendingAction.type === "reject")}
          variant="destructive"
        >
          {pendingAction?.id === request.$id && pendingAction.type === "reject" ? "Processing..." : "Reject"}
        </Button>
      </CardFooter>
    </Card>
  ))}
</div>

  );
}
