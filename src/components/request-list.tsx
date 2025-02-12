"use client";

import { useState } from "react";
import type { Request } from "@/types/request";
import { approveRequest, rejectRequest } from "../actions/request-actions";
import { Button } from "@/components/ui/button";
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
  const [pendingAction, setPendingAction] = useState<string | null>(null);

  const handleApprove = async (id: string) => {
    setPendingAction(id);
    await approveRequest(id);
    setPendingAction(null);
  };

  const handleReject = async (id: string) => {
    setPendingAction(id);
    await rejectRequest(id);
    setPendingAction(null);
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {requests.map((request) => (
        <Card key={request.id}>
          <CardHeader>
            <CardTitle>{request.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{request.email}</p>
            <p className="text-sm text-muted-foreground">
              Status: {request.status}
            </p>
            <p className="text-sm text-muted-foreground">
              Created: {new Date(request.createdAt).toLocaleString()}
            </p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              onClick={() => handleApprove(request.id)}
              disabled={
                request.status !== "pending" || pendingAction === request.id
              }
            >
              {pendingAction === request.id ? "Processing..." : "Approve"}
            </Button>
            <Button
              onClick={() => handleReject(request.id)}
              disabled={
                request.status !== "pending" || pendingAction === request.id
              }
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
