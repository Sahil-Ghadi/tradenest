import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = ["/item"];
const authRoutes = ["/login", "/signup"];

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Get the Appwrite session cookie (Appwrite names it `a_session_<project_id>`)
    const authToken = request.cookies.get(`a_session_${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID}`)?.value;
    
    const isAuthenticated = !!authToken; // User is authenticated if token exists

    // ✅ Redirect unauthenticated users trying to access protected routes
    if (protectedRoutes.some(route => pathname.startsWith(route)) && !isAuthenticated) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    // ✅ Redirect logged-in users away from login/signup pages
    if (authRoutes.some(route => pathname.startsWith(route)) && isAuthenticated) {
        return NextResponse.redirect(new URL("/", request.url)); // Redirect to home/dashboard
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico).*)",
    ],
};
