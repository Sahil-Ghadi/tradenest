import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist } from "zustand/middleware";
import { useAuthStore } from "./authStore";
import { GetItems, GetMyOrders, GetRequest, BuyItem, CreateRequest, CreateItem, ApproveRequest, RejectRequest } from "@/lib/adminService";

interface AdminStore {
  user: any | null;
  hydrated: boolean;
  setHydrated(): void;

  fetchItems(): Promise<any>;
  fetchMyOrders(): Promise<any>;
  fetchRequests(): Promise<any>;
  buyItem(itemId: string): Promise<any>;
  createRequest(itemName: string, itemId: string, sellerName: string, price: number): Promise<any>;
  createItem(name: string, price: number): Promise<any>;
  approveRequest(reqId: string, itemId: string): Promise<any>;
  rejectRequest(reqId: string, itemId: string): Promise<any>;
}

export const useAdminStore = create<AdminStore>()(
  persist(
    immer((set) => ({
      user: null,
      hydrated: false,
      setHydrated() {
        set({ hydrated: true });
      },

      async fetchItems() {
        return await GetItems();
      },

      async fetchMyOrders() {
        const { user } = useAuthStore.getState();
        if (!user) return { success: false };
        return await GetMyOrders(user.name);
      },

      async fetchRequests() {
        const { user } = useAuthStore.getState();
        if (!user) return { success: false };
        return await GetRequest(user.name);
      },

      async buyItem(itemId: string) {
        const { user } = useAuthStore.getState();
        if (!user) return { success: false };
        return await BuyItem(itemId, user.name);
      },

      async createRequest(itemName: string, itemId: string, sellerName: string, price: number) {
        const { user } = useAuthStore.getState();
        if (!user) return { success: false };
        return await CreateRequest(itemName, itemId, sellerName, user.name, price);
      },

      async createItem(name: string, price: number) {
        const { user } = useAuthStore.getState();
        if (!user) return { success: false };
        return await CreateItem(name, price, user.name);
      },

      async approveRequest(reqId: string, itemId: string) {
        return await ApproveRequest(reqId, itemId);
      },

      async rejectRequest(reqId: string, itemId: string) {
        return await RejectRequest(reqId, itemId);
      },
    })),
    {
      name: "admin",
    }
  )
);
