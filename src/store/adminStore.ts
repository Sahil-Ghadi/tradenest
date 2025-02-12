import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist } from "zustand/middleware";

import { AppwriteException, ID, Models, Query } from "appwrite";
import { databases } from "@/models/client/config";
import { db, itemsCollection, requestCollection } from "@/models/name";

interface AdminStore {
  user: Models.User<any> | null;
  hydrated: boolean;
  setHydrated(): void;

  GetItems(): Promise<{
    success: boolean;
    error?: AppwriteException | null;
  }>;
  Buyitem(
    itemId: string,
    username: string,
    price: number
  ): Promise<{
    success: boolean;
    error?: AppwriteException | null;
  }>;
  CreateItem(
    itemName: string,
    price: number,
    seller: string
  ): Promise<{
    success: boolean;
    error?: AppwriteException | null;
  }>;
  RejectReq(
    reqId: string,
    itemId: string
  ): Promise<{
    success: boolean;
    error?: AppwriteException | null;
  }>;
  ApproveReq(
    reqId: string,
  ): Promise<{
    success: boolean;
    error?: AppwriteException | null;
  }>;
}
export const useAdminStore = create<AdminStore>()(
  persist(
    immer((set) => ({
      user: null,
      hydrated: false,

      setHydrated() {
        set({ hydrated: true });
      },
      async GetItems() {
        try {
          await databases.listDocuments(db, itemsCollection, [
            Query.equal("status", "UNSOLD"),
          ]);
          return { success: true };
        } catch (error) {
          console.log(error);
          return {
            success: false,
            error: error instanceof AppwriteException ? error : null,
          };
        }
      },
      async Buyitem(itemId: string, username: string, price: number) {
        try {
          await databases.updateDocument(db, itemsCollection, itemId, {
            status: "SOLD",
            buyerName: username,
          });
          await databases.createDocument(db, requestCollection, ID.unique(), {
            status: "PENDING",
            buyerName: username,
            sellerName: null,
            itemId: itemId,
          });
          return { success: true };
        } catch (error) {
          console.log(error);
          return {
            success: false,
            error: error instanceof AppwriteException ? error : null,
          };
        }
      },
      async CreateItem(itemName: string, price: number, seller: string) {
        try {
          await databases.createDocument(db, itemsCollection, ID.unique(), {
            name: itemName,
            price: price,
            buyerId: null,
            sellerId: seller,
          });
          return { success: true };
        } catch (error: any) {
          console.log(error);
          return {
            success: false,
            error: error instanceof AppwriteException ? error : null,
          };
        }
      },
      async ApproveReq(reqId: string) {
        try {
          await databases.updateDocument(db, itemsCollection, reqId, {
            status: "APPROVE",
          });
          return { success: true };
        } catch (error: any) {
          console.log(error);
          return {
            success: false,
            error: error instanceof AppwriteException ? error : null,
          };
        }
      },
      async RejectReq(reqId: string,itemId: string) {
        try {
          await databases.updateDocument(db, itemsCollection, reqId, {
            status: "REJECT",
          });
          await databases.updateDocument(db, itemsCollection, itemId, {
            status: "UNSOLD",
            buyerName: null,
          });
          return { success: true };
        } catch (error: any) {
          console.log(error);
          return {
            success: false,
            error: error instanceof AppwriteException ? error : null,
          };
        }
      },
    })),
    {
      name: "admin",
      onRehydrateStorage() {
        return (state, error) => {
          if (!error) state?.setHydrated();
        };
      },
    }
  )
);
