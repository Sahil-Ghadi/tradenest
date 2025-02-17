"use client"
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist } from "zustand/middleware";
import { useAuthStore } from "./authStore";
import { AppwriteException, ID, Models, Query } from "appwrite";
import { databases, storage } from "@/models/client/config";
import { db, ItemAttachmentBucket, itemsCollection, requestCollection } from "@/models/name";

interface AdminStore {
  user: Models.User<Models.Preferences> | null;
  hydrated: boolean;
  setHydrated(): void;

  GetItems(): Promise<{
    success:boolean,
    data?:any,
    error?: AppwriteException | null;
  }>;
  GetMyOrders(): Promise<{
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
    error?: AppwriteException | null | string;
  }>;
  CreateReq(
    Itemname: string,
    itemId: string,
    sellerName:string,
    price:number
  ): Promise<{
    success: boolean;
    error?: AppwriteException | null;
  }>;
  CreateItem(
    name: string,
    price: number,
    file:File
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
  GetFile(id:string): Promise<{
    success: boolean;
    data?:string,
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
            Query.or([
              Query.equal("status", "UNSOLD"),
              Query.equal("status", "REQUESTED")
            ])
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
      async GetMyOrders() {
        try {
          const { user } = useAuthStore.getState();
          if (!user) return { success: false };

          const req = await databases.listDocuments(db, requestCollection, [
            Query.equal("buyerName", user.name),
          ]);
          return { success: true, data: req };
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
            Query.equal("sellerName", user.name),
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
      
          const item = await databases.getDocument(db, itemsCollection, itemId);
          if (!item) return { success: false };

          if(item.sellerName === user.name) return {
            success: false,
            error:"Can't purchase your own item"
          }
      
          await databases.updateDocument(db, itemsCollection, itemId, {
            buyerName: user.name,
            status:"REQUESTED"
          });
      
          // Create a request in requestCollection
          await databases.createDocument(db, requestCollection, ID.unique(), {
            status: "PENDING",
            buyerName: user.name,
            sellerName: item.sellerName,
            Itemname: item.name,
            itemId: item.$id,
            price: item.price,
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
      

      async CreateReq(Itemname: string,itemId: string, sellerName: string,price:number) {
        try {
          const { user } = useAuthStore.getState();
          if (!user) return { success: false };

          await databases.createDocument(db, requestCollection, ID.unique(), {
            status: "PENDING",
            buyerName: user.name,
            sellerName, 
            Itemname,
            itemId,
            price
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

      async CreateItem(name: string, price: number,file:File) {
        try {
          const { user } = useAuthStore.getState();
          if (!user) return { success: false };
          const id = ID.unique()
          await databases.createDocument(db, itemsCollection,id , {
            name,
            buyerName: "",
            price,
            sellerName: user.name,
            status: "UNSOLD",
          });
          await storage.createFile(ItemAttachmentBucket,id,file)

          return { success: true };
        } catch (error) {
          console.log("Error in CreateItem:", error);
          return {
            success: false,
            error: error instanceof AppwriteException ? error : null,
          };
        }
      },
      async GetFile(id:string){
        try {
          const url = await storage.getFileView(ItemAttachmentBucket,id)
          return { success: true , data:url };
        } catch (error) {
          console.log("Error in Getfile:", error);
          return {
            success: false,
            error: error instanceof AppwriteException ? error : null,
          };
        }
      },

      async ApproveReq(reqId: string, itemId: string, buyerName: string) {
        try {
          await Promise.all([
            databases.updateDocument(db, requestCollection, reqId, {
              status: "APPROVE",
            }),
            databases.updateDocument(db, itemsCollection, itemId, {
              status: "SOLD",
              buyerName: buyerName,
            }),
          ]);
          
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
          await Promise.all([
            databases.updateDocument(db, requestCollection, reqId, {
              status: "REJECT",
            }),
            databases.updateDocument(db, itemsCollection, itemId, {
              status: "UNSOLD",
              buyerName: "", // Avoid setting it to null
            }),
          ]);
      
          return { success: true };
        } catch (error) {
          console.log("Error in RejectReq:", error);
          return {
            success: false,
            error: error instanceof AppwriteException ? error : null,
          };
        }
      }
      
      
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
