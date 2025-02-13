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
const {ApproveReq,RejectReq} = useAdminStore()

const handleApprove = async (id:string) => {
  try {
    const res = await ApproveReq(id)
  } catch (error:any) {
    console.log(error.message)
  }
}
const handleReject = async (id:string,itemId:string) => {
  try {
    const res = await RejectReq(id,itemId)
  } catch (error:any) {
    console.log(error.message)
  }
}

export function RequestList({ requests }: RequestListProps) {
  const [pendingAction, setPendingAction] = useState<string | null>(null);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {requests.map((request) => (
        <Card key={request.id}>
          <CardHeader>
            <CardTitle>{request.Itemname}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{request.buyerName}</p>
            <p className="text-sm text-muted-foreground">
              Status: {request.status}
            </p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              onClick={() => handleApprove(request.id)}
              disabled={
                request.status !== "PENDING" || pendingAction === request.id
              }
            >
              {pendingAction === request.id ? "Processing..." : "Approve"}
            </Button>
            <Button
              onClick={() => handleReject(request.id,request.itemId)}
              disabled={
                request.status !== "PENDING" || pendingAction === request.id
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
