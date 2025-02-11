import {IndexType, Permission} from "node-appwrite"

import {db, requestCollection} from "../name"
import {databases} from "./config"


export default async function createRequestCollection(){
  // create collection
  await databases.createCollection(db, requestCollection, requestCollection, [
    Permission.read("any"),
    Permission.read("users"),
    Permission.create("users"),
    Permission.update("users"),
    Permission.delete("users"),
  ])
  console.log("request collection is created")

  //creating attributes and Indexes

  await Promise.all([
    databases.createEnumAttribute(db, requestCollection, "status",["PENDING","APPROVE","REJECT"], true),
    databases.createStringAttribute(db, requestCollection, "itemId", 50, true),
    databases.createStringAttribute(db, requestCollection, "buyerId", 50, true),
    databases.createStringAttribute(db, requestCollection, "sellerId", 50, true, undefined, true),
  ]);
  console.log("request Attributes created")

}