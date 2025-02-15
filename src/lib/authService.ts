// src/services/authService.ts
import { AppwriteException, ID, Models } from "appwrite";
import { account } from "@/models/client/config";

export const verifySession = async () => {
  try {
    const session = await account.getSession("current");
    const user = await account.get();
    return { success: true, session, user };
  } catch (error) {
    console.log(error);
    return { success: false };
  }
};

export const login = async (email: string, password: string) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    const [user, { jwt }] = await Promise.all([account.get(), account.createJWT()]);
    return { success: true, session, user, jwt };
  } catch (error) {
    console.log(error);
    return { success: false, error: error instanceof AppwriteException ? error : null };
  }
};

export const createAccount = async (name: string, email: string, password: string) => {
  try {
    await account.create(ID.unique(), email, password, name);
    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false, error: error instanceof AppwriteException ? error : null };
  }
};

export const logout = async () => {
  try {
    await account.deleteSessions();
    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false };
  }
};
