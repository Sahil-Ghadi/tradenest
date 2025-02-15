import { NextRequest, NextResponse } from "next/server";
import { CreateItem } from "@/lib/adminService";
import { useAuthStore } from "@/store/authStore";

export async function POST(req: NextRequest) {
    try {

        const data = await req.json();
       const { name, price, sellerName } = data

        console.log(data);
        
        if (!name || !price) {
            return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 });
        }

        const itemResponse = await CreateItem(name, price,sellerName);

        return NextResponse.json({ success: true, message: "Item added successfully!" });

    } catch (error) {
        return NextResponse.json(
            { success: false, message: "Server error while adding item" },
            { status: 500 }
        );
    }
}
