import { NextResponse } from "next/server";
import { GetMyOrders } from "@/lib/adminService";
import { useAuthStore } from "@/store/authStore";

export async function GET() {
  try {
    const { user } = useAuthStore.getState();
    if (!user) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const response = await GetMyOrders(user.name);
    
    return NextResponse.json({ success: true, data: response });
  } catch (error) {
    console.error("Error in API /api/orders:", error);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
