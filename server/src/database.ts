import * as mongodb from "mongodb";
import {Item} from "./items";

 
export const collections: {
   Shirts?: mongodb.Collection<Item>;
   books?: mongodb.Collection<Item>;
} = {};
 
export async function connectToDatabase(uri: string) {
   const client = new mongodb.MongoClient(uri);
   await client.connect();
 
   const db = client.db("shopItems");
   await applySchemaValidation(db);
 
   const shirtsCollection = db.collection<Item>("Shirts");
   collections.Shirts = shirtsCollection;
   const booksCollection = db.collection<Item>("books");
   collections.books = booksCollection;
}
 
// Update our existing collection with JSON schema validation so we know our documents will always match the shape of our Employee model, even if added elsewhere.
// For more information about schema validation, see this blog series: https://www.mongodb.com/blog/post/json-schema-validation--locking-down-your-model-the-smart-way
async function applySchemaValidation(db: mongodb.Db) {
   const jsonSchema = {
       $jsonSchema: {
           bsonType: "object",
           required: ["name", "price", "description"],
           additionalProperties: false,
           properties: {
               _id: {},
               name: {
                   bsonType: "string",
                   description: "'name' is required and is a string",
               },
               price: {
                   bsonType: "string",
                   description: "'price' is required and is a string",
                //    minLength: 5
               },
               description: {
                   bsonType: "string",
                   description: "'description' is required and is a string",
                //    enum: ["junior", "mid", "senior"],
               },
           },
       },
   };
 
   // Try applying the modification to the collection, if the collection doesn't exist, create it
  await db.command({
       collMod: "items",
       validator: jsonSchema
   }).catch(async (error: mongodb.MongoServerError) => {
       if (error.codeName === 'NamespaceNotFound') {
           await db.createCollection("items", {validator: jsonSchema});
       }
   });
}