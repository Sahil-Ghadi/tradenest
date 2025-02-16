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
import { useRouter } from "next/navigation";

interface RequestListProps {
  requests: Request[];
}

export function RequestList({ requests: initialRequests }: RequestListProps) {
  const router = useRouter()
  const { ApproveReq, RejectReq } = useAdminStore();
  const [requests, setRequests] = useState<Request[]>(initialRequests);
  const [pendingAction, setPendingAction] = useState<{
    id: string;
    type: "approve" | "reject";
  } | null>(null);

  const handleApprove = async (
    id: string,
    itemId: string,
    buyerName: string
  ) => {
    try {
      setPendingAction({ id, type: "approve" });

      const res = await ApproveReq(id, itemId, buyerName);
      router.push("/")

      if (!res.success)
        throw new Error(res.error?.message || "Approval failed");
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

      const res = await RejectReq(id, itemId);
      if (!res.success)
        throw new Error(res.error?.message || "Rejection failed");
      router.push("/")
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
        <Card className="mx-2" key={request.$id || `fallback-key-${index}`}>
          <CardHeader className="px-6 pt-6 pb-3">
            <CardTitle className="text-3xl font-semibold capitalize">
              {request.Itemname}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-md text-muted-foreground">
              Buyer: {request.buyerName}
            </p>
            <p className="text-md text-muted-foreground">
              Status: {request.status}
            </p>
            <p className="text-md text-muted-foreground">
              Price: {request.price} Rs
            </p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              className="bg-green-500 w-1/2 mx-2 group relative hover:bg-green-600 active:scale-95"
              onClick={() =>
                handleApprove(request.$id, request.itemId, request.buyerName)
              }
              disabled={
                request.status !== "PENDING" ||
                (pendingAction?.id === request.$id &&
                  pendingAction.type === "approve")
              }
            >
              <span className="group-hover:hidden">
                {pendingAction?.id === request.$id &&
                pendingAction.type === "approve"
                  ? "Processing..."
                  : "Approve"}
              </span>
              <span className="hidden group-hover:inline">&#10004;</span>
            </Button>

            <Button
              className="bg-red-600 w-1/2 mx-2 group relative hover:bg-red-700 active:scale-95"
              onClick={() => handleReject(request.$id, request.itemId)}
              disabled={
                request.status !== "PENDING" ||
                (pendingAction?.id === request.$id &&
                  pendingAction.type === "reject")
              }
              variant="destructive"
              >
              <span className="group-hover:hidden">
              {pendingAction?.id === request.$id &&
              pendingAction.type === "reject"
                ? "Processing..."
                : "Reject"}
                </span>
                <span className="hidden group-hover:inline">&#10008;</span>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
