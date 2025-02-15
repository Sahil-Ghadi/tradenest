import { NextResponse } from "next/server";
import { useAuthStore } from "@/store/authStore";
import { GetRequest } from "@/lib/adminService";
export async function GET() {
  try {
   const { user } = useAuthStore.getState();
       if (!user) {
         return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
       }
       const response = await GetRequest(user.name);
   
    return NextResponse.json({
      success: response.success,
      data: response.success ? response : [],
      message: response.success ? "Requests fetched successfully" : "Failed to fetch requests",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Server error fetching requests" },
      { status: 500 }
    );
  }
}
