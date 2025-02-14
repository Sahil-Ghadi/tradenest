import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import getOrCreateDB from "./models/server/dbSet";
import getOrCreateStorage from "./models/server/storageSet";

export async function middleware(request: NextRequest) {
  // Perform any necessary setup
  await Promise.all([getOrCreateDB(), getOrCreateStorage()]);

  // Define protected routes
   const protectedRoutes = ["/admin", "/item", "/addItem","/dashboard"];

  // Check if the current path is a protected route
   if (protectedRoutes.some((route) => request.nextUrl.pathname.startsWith(route))) {
    const authToken = request.cookies.get("authToken")?.value; // Replace with your actual auth method

    if (!authToken) {
    // Redirect to login if not authenticated
    return NextResponse.redirect(new URL("/login", request.url));
   }
 }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
