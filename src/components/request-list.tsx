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

export function RequestList({ requests }: RequestListProps) {
  const { ApproveReq, RejectReq } = useAdminStore();
  const [pendingAction, setPendingAction] = useState<string | null>(null);

  const handleApprove = async (id: string) => {
    try {
      setPendingAction(id);
      await ApproveReq(id);
      console.log("approved");
    } catch (error: any) {
      console.error(error.message);
    } finally {
      setPendingAction(null);
    }
  };

  const handleReject = async (id: string, itemId: string) => {
    try {
      setPendingAction(id);
      await RejectReq(id, itemId);
      console.log("rejected");
    } catch (error: any) {
      console.error(error.message);
    } finally {
      setPendingAction(null);
    }
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {requests.map((request) => (
        <Card key={request.id}>
          <CardHeader>
            <CardTitle>{request.Itemname}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Buyer: {request.buyerName}</p>
            <p className="text-sm text-muted-foreground">Status: {request.status}</p>
            <p className="text-sm text-muted-foreground">Price: ${request.price}</p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              onClick={() => handleApprove(request.id)}
              disabled={request.status !== "PENDING" || pendingAction === request.id}
            >
              {pendingAction === request.id ? "Processing..." : "Approve"}
            </Button>
            <Button
              onClick={() => handleReject(request.id, request.itemId)}
              disabled={request.status !== "PENDING" || pendingAction === request.id}
              variant="destructive"
            >
              {pendingAction === request.id ? "Processing..." : "Reject"}
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
