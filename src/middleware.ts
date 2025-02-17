import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import getOrCreateDB from "./models/server/dbSet";
import getOrCreateStorage from "./models/server/storageSet";


let isInitialized = false; 

async function initializeOnce() {
    if (!isInitialized) {
        await Promise.all([getOrCreateDB(), getOrCreateStorage()]);
        isInitialized = true;
    }
}

export async function middleware(request: NextRequest) {
    await initializeOnce();

    
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
