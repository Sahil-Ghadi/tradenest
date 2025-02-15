import { NextResponse } from "next/server";
import { RejectRequest } from "@/lib/adminService";

export async function POST(req: Request) {
  try {
    const { reqId, itemId } = await req.json();

    const response = await RejectRequest(reqId, itemId);

    return NextResponse.json({
      success: response.success,
      message: response.success ? "Request rejected" : "Failed to reject request",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Server error while rejecting request" },
      { status: 500 }
    );
  }
}
