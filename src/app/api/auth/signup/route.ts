import { NextResponse } from "next/server";
import { login } from "@/lib/authService";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ success: false, error: "Email and password are required" }, { status: 400 });
    }

    const response = await login(email, password);

    return NextResponse.json({ success: true, session: response.session, jwt: response.jwt });
    
  } catch (error) {
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
