import { db } from "../name";
import createItemCollection from "./items.collection";
import createRequestCollection from "./request.collection";
import { databases } from "./config";

export default async function getOrCreateDB(){
    try {
        await databases.get(db)
        console.log('database connected')
    } catch (error) {
        console.log(error);
        try {
            await databases.create(db,db)
            console.log("db created");

            await Promise.all([
                createItemCollection(),
                createRequestCollection()
            ])
            console.log("coll and db created");
            
        } catch (error) {
            console.log("error in creating db / collection");
            console.log(error);

        }
    }
}