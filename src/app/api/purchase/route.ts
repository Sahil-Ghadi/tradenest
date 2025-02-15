import { NextResponse } from "next/server";
import { BuyItem, CreateRequest } from "@/lib/adminService";

export async function POST(req: Request) {
    try {
        const { itemId, itemName, sellerName,buyerName, price } = await req.json();

        // Step 1: Buy item
        const buyResponse = await BuyItem(itemId,buyerName);
        if (!buyResponse.success) {
            return NextResponse.json({ success: false, message: "Failed to purchase item" }, { status: 400 });
        }

        // Step 2: Create purchase request
        const requestResponse = await CreateRequest(itemName, itemId, sellerName,buyerName, price);
       
        return NextResponse.json({ success: true, message: "Purchase and request successful!" });

    } catch (error) {
        return NextResponse.json(
            { success: false, message: "Server error during purchase" },
            { status: 500 }
        );
    }
}
