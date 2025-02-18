import { NextResponse } from "next/server";

export async function middleware() {

    
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
