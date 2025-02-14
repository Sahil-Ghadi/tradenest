import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist } from "zustand/middleware";
import { useAuthStore } from "./authStore";
import { AppwriteException, ID, Models, Query } from "appwrite";
import { databases } from "@/models/client/config";
import { db, itemsCollection, requestCollection } from "@/models/name";
import { Item } from "@/types/item";

interface AdminStore {
  user: Models.User<any> | null;
  hydrated: boolean;
  setHydrated(): void;

  GetItems(): Promise<{
    success:boolean,
    data?:any,
    error?: AppwriteException | null;
  }>;
  GetRequest(): Promise<{
    success:boolean,
    data?:any,
    error?: AppwriteException | null;
  }>;
  Buyitem(
    itemId: string,

  ): Promise<{
    success: boolean;
    error?: AppwriteException | null;
  }>;
  CreateReq(
    itemId: string,
    sellerId:string
  ): Promise<{
    success: boolean;
    error?: AppwriteException | null;
  }>;
  CreateItem(
    name: string,
    price: number,
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
  ApproveReq(reqId: string,itemId:string,buyerName: string): Promise<{
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
          const items = await databases.listDocuments(db, itemsCollection, [
            Query.equal("status", "UNSOLD"),
          ]);
          return { success: true, data: items };
        } catch (error) {
          console.log("Error in GetItems:", error);
          return {
            success: false,
            error: error instanceof AppwriteException ? error : null,
          };
        }
      },

      async GetRequest() {
        try {
          const { user } = useAuthStore.getState();
          if (!user) return { success: false };

          const requests = await databases.listDocuments(db, requestCollection, [
            Query.equal("sellerId", user.$id),
          ]);
          return { success: true, data: requests };
        } catch (error) {
          console.log("Error in GetRequest:", error);
          return {
            success: false,
            error: error instanceof AppwriteException ? error : null,
          };
        }
      },

      async Buyitem(itemId: string) {
        try {
          const { user } = useAuthStore.getState();
          if (!user) return { success: false };

          await databases.updateDocument(db, itemsCollection, itemId, {
            buyerName: user.name,
          });
          return { success: true };
        } catch (error) {
          console.log("Error in BuyItem:", error);
          return {
            success: false,
            error: error instanceof AppwriteException ? error : null,
          };
        }
      },

      async CreateReq(itemId: string, sellerId: string) {
        try {
          const { user } = useAuthStore.getState();
          if (!user) return { success: false };

          await databases.createDocument(db, requestCollection, ID.unique(), {
            status: "PENDING",
            buyerName: user.name,
            sellerId, 
            itemId,
          });
          return { success: true };
        } catch (error) {
          console.log("Error in CreateReq:", error);
          return {
            success: false,
            error: error instanceof AppwriteException ? error : null,
          };
        }
      },

      async CreateItem(name: string, price: number) {
        try {
          const { user } = useAuthStore.getState();
          if (!user) return { success: false };

          await databases.createDocument(db, itemsCollection, ID.unique(), {
            name,
            buyerName: "",
            price,
            sellerId: user.$id,
            status: "UNSOLD",
          });
          return { success: true };
        } catch (error) {
          console.log("Error in CreateItem:", error);
          return {
            success: false,
            error: error instanceof AppwriteException ? error : null,
          };
        }
      },

      async ApproveReq(reqId: string,itemId: string,buyerName: string) {
        try {
          await databases.updateDocument(db, requestCollection, reqId, {
            status: "APPROVE",
          });
          await databases.updateDocument(db, itemsCollection, itemId, {
            status: "SOLD",
            buyerName: null,
          });
          return { success: true };
        } catch (error) {
          console.log("Error in ApproveReq:", error);
          return {
            success: false,
            error: error instanceof AppwriteException ? error : null,
          };
        }
      },

      async RejectReq(reqId: string, itemId: string) {
        try {
          await databases.updateDocument(db, requestCollection, reqId, {
            status: "REJECT",
          });
          await databases.updateDocument(db, itemsCollection, itemId, {
            status: "UNSOLD",
            buyerName: null,
          });
          return { success: true };
        } catch (error) {
          console.log("Error in RejectReq:", error);
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
          if (!error && state) {
            state.setHydrated();
          }
        };
      },
    }
  )
);
