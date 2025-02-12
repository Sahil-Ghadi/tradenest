import { IndexType, Permission } from "node-appwrite";
import { itemsCollection, db } from "../name";
import { databases } from "./config";

export default async function createItemCollection() {
  // Creating Collection
  await databases.createCollection(db, itemsCollection, itemsCollection, [
    Permission.create("users"),
    Permission.read("any"),
    Permission.read("users"),
    Permission.update("users"),
    Permission.delete("users"),
  ]);
  console.log("item Collection Created");

  // Creating Attributes
  await Promise.all([
    databases.createStringAttribute(db, itemsCollection, "name", 50, true),
    databases.createStringAttribute(db, itemsCollection, "sellerId", 50, true),
    databases.createStringAttribute(db, itemsCollection, "buyerName", 50, true),
    databases.createStringAttribute(db, itemsCollection, "price", 50, true),
    databases.createEnumAttribute(db,itemsCollection,"status",["SOLD", "UNSOLD"],true),
  ]);
  console.log("item Attributes Created");
}
