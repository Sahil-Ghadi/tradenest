import { NextResponse } from "next/server";
import { ApproveRequest } from "@/lib/adminService";

export async function POST(req: Request) {
  try {
    const { reqId, itemId } = await req.json();

    const response = await ApproveRequest(reqId, itemId);

    return NextResponse.json({
      success: response.success,
      message: response.success ? "Request approved" : "Failed to approve request",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Server error while approving request" },
      { status: 500 }
    );
  }
}
