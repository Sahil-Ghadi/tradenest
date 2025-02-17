import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import getOrCreateDB from "./models/server/dbSet";
import getOrCreateStorage from "./models/server/storageSet";

const protectedRoutes = ["/item"];
const authRoutes = ["/login", "/signup"];

let isInitialized = false; // Ensures DB and Storage run only once

async function initializeOnce() {
    if (!isInitialized) {
        await Promise.all([getOrCreateDB(), getOrCreateStorage()]);
        isInitialized = true;
    }
}

export async function middleware(request: NextRequest) {
    // Ensure DB & Storage run only once
    await initializeOnce();

    // const token = request.cookies.get(`a_session_${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID}`)?.value;
    
    // if (!token) {
    //     return NextResponse.redirect(new URL('/login', request.url)); // Redirect if no token
    // }

    return NextResponse.next(); // Allow access if token exists
}
export const config = {
    matcher: [
        '/',
        '/dashboard',
        '/addItem',
        '/admin',
        '/myOrders'
    ],
};
