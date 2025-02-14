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
    username: string,
    price: number
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
  ApproveReq(reqId: string): Promise<{
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
          console.log(error);
          return {
            success: false,
            error: error instanceof AppwriteException ? error : null,

          };
        }
      },
      async GetRequest() {
        try {
          const { user } = useAuthStore.getState();
          if (!user) 
            return { success: false};
          const requests = await databases.listDocuments(db, requestCollection, [
            Query.equal("sellerId", user.$id),
          ]);
          return { success: true, data: requests };
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
            price: price,
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
      async CreateItem(name: string, price: number) {
        const { user } = useAuthStore.getState();
        try {
          await databases.createDocument(db, itemsCollection, ID.unique(), {
            name: name,
            buyerName: "",
            price: price.valueOf(),
            sellerId: user?.$id,
            status:"UNSOLD"
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
          await databases.updateDocument(db, requestCollection, reqId, {
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
