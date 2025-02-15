import { AppwriteException, ID, Query } from "appwrite";
import { databases } from "@/models/client/config";
import { db, itemsCollection, requestCollection } from "@/models/name";

// Fetch items that are unsold
export async function GetItems() {
  try {
    const items = await databases.listDocuments(db, itemsCollection, [Query.equal("status", "UNSOLD"),]
  );
    return { success: true, data: items };
  } catch (error) {
    console.log("Error in GetItems:", error);
    return { success: false, error: error instanceof AppwriteException ? error : null };
  }
}

// Fetch logged-in user's orders
export async function GetMyOrders(userName: string) {
  try {
    const orders = await databases.listDocuments(db, requestCollection, [
      Query.equal("buyerName", userName),
    ]);
    return { success: true, data: orders };
  } catch (error) {
    console.log("Error in GetMyOrders:", error);
    return { success: false, error: error instanceof AppwriteException ? error : null };
  }
}

// Fetch requests where the user is the seller
export async function GetRequest(userName: string) {
  try {
    const requests = await databases.listDocuments(db, requestCollection, [
      Query.equal("sellerName", userName),
    ]);
    return { success: true, data: requests };
  } catch (error) {
    console.log("Error in GetRequest:", error);
    return { success: false, error: error instanceof AppwriteException ? error : null };
  }
}

// Buy an item (Update buyerName in database)
export async function BuyItem(itemId: string, buyerName: string) {
  try {
    await databases.updateDocument(db, itemsCollection, itemId, {
      buyerName: buyerName,
    });
    return { success: true };
  } catch (error) {
    console.log("Error in BuyItem:", error);
    return { success: false, error: error instanceof AppwriteException ? error : null };
  }
}

// Create a new purchase request
export async function CreateRequest(itemName: string, itemId: string, sellerName: string, buyerName: string, price: number) {
  try {
    await databases.createDocument(db, requestCollection, ID.unique(), {
      status: "PENDING",
      buyerName,
      sellerName,
      itemName,
      itemId,
      price,
    });
    return { success: true };
  } catch (error) {
    console.log("Error in CreateRequest:", error);
    return { success: false, error: error instanceof AppwriteException ? error : null };
  }
}

// Create a new item listing
export async function CreateItem(name: string, price: number, sellerName: string) {
  try {
    await databases.createDocument(db, itemsCollection, ID.unique(), {
      name,
      price,
      buyerName: "",
      sellerName,
      status: "UNSOLD",
    });
    return { success: true };
  } catch (error) {
    console.log("Error in CreateItem:", error);
    return { success: false, error: error instanceof AppwriteException ? error : null };
  }
}

// Approve a request
export async function ApproveRequest(reqId: string, itemId: string) {
  try {
    await databases.updateDocument(db, requestCollection, reqId, { status: "APPROVE" });
    await databases.updateDocument(db, itemsCollection, itemId, { status: "SOLD", buyerName: null });
    return { success: true };
  } catch (error) {
    console.log("Error in ApproveRequest:", error);
    return { success: false, error: error instanceof AppwriteException ? error : null };
  }
}

// Reject a request
export async function RejectRequest(reqId: string, itemId: string) {
  try {
    await databases.updateDocument(db, requestCollection, reqId, { status: "REJECT" });
    await databases.updateDocument(db, itemsCollection, itemId, { status: "UNSOLD", buyerName: null });
    return { success: true };
  } catch (error) {
    console.log("Error in RejectRequest:", error);
    return { success: false, error: error instanceof AppwriteException ? error : null };
  }
}
