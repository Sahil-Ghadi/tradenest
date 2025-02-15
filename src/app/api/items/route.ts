import { NextResponse } from "next/server";
import { GetItems } from "@/lib/adminService";

export async function GET() {
  try {
    const response = await GetItems();    
    return NextResponse.json({ success: true, data: response.data });
  } catch (error) {
    console.error("Error in API /api/items:", error);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
