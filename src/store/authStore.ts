import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist } from "zustand/middleware";
import {  Models } from "appwrite";
import { verifySession, login, createAccount, logout } from "@/lib/authService";

interface AuthStore {
  session: Models.Session | null;
  jwt: string | null;
  user: Models.User<any> | null;
  hydrated: boolean;
  setHydrated(): void;
  verifySession(): Promise<void>;
  login(email: string, password: string): Promise<any>;
  createAccount(name: string, email: string, password: string): Promise<any>;
  logout(): Promise<void>;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    immer((set) => ({
      session: null,
      jwt: null,
      user: null,
      hydrated: false,

      setHydrated() {
        set({ hydrated: true });
      },

      async verifySession() {
        const res = await verifySession();
        if (res.success) {
          set({ session: res.session, user: res.user });
        }
      },

      async login(email: string, password: string) {
        const res = await login(email, password);        
        if (res.success) {
          set({ session: res.session, user: res.user, jwt: res.jwt });
        }
        return res;
      },

      async createAccount(name: string, email: string, password: string) {
        return await createAccount(name, email, password);
      },

      async logout() {
        await logout();
        set({ session: null, jwt: null, user: null });
      },
    })),
    {
      name: "auth",
      onRehydrateStorage: () => (state, error) => {
        if (!error && state) state.setHydrated();
      },
    }
  )
);
