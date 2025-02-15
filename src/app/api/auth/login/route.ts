import { NextRequest, NextResponse } from "next/server";
import { login } from "@/lib/authService"; 

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    const response = await login(email, password);
      return NextResponse.json({ success: true, data: response });
   
  } catch (error: any) {
    console.error("Login Error:", error); // Logs error for debugging
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
