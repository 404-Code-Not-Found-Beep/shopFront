import * as express from "express";
import * as mongodb from "mongodb";
import { collections } from "./database";

export const shopRouter = express.Router();
shopRouter.use(express.json());

shopRouter.get('/', async (req, res) => {
    try {
        const books = await collections.books.find({}).toArray();
        const shirts = await collections.Shirts.find({}).toArray();
        let items : any =[];
        items = books.concat(shirts);
        res.status(200).send(items);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

shopRouter.get('/books', async (req,res) => {
    try {
        const books = await collections.books.find({}).toArray();
        res.status(200).send(books);
    } catch (error) { 
        res.status(500).send(error.message);
    }
})

shopRouter.get('/shirts', async (req,res) => {
    try {
        const shirts = await collections.Shirts.find({}).toArray();
        res.status(200).send(shirts);
    } catch (error) { 
        res.status(500).send(error.message);
    }
}) 

//this could be used with the search bar functionality
shopRouter.get('/:id', async (req,res) => {
    try {
        const id = req?.params?.id;
        const query = {_id: new mongodb.ObjectId(id) };
        const bookItem = await collections.books.findOne(query);
        const shirtItem = await collections.Shirts.findOne(query);
        if ( bookItem ) {
            res.status(200).send(bookItem);
        } 
        if (shirtItem) {
            res.status(200).send(shirtItem);
        } 
        if (!shirtItem && !bookItem) {
            res.status(404).send(`Failed to find an item: ID ${id}`);
        }
    } catch (error) {
        res.status(404).send(`Failed to find an item: ID ${req?.params?.id}`);
    }
});

shopRouter.put("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const item = req.body;
        const itemtype =req.body.itemType;
        req.body = delete req.body.itemType;
        //this deletes the itemtype before it is sent but its still used to differenciate between collections
        // console.log(item, itemtype, req.body);
        const query = { _id: new mongodb.ObjectId(id) };
        // const result = await collections.employees.updateOne(query, { $set: employee });
        const foundBook = await collections.books.findOne(query);
        if(foundBook && itemtype === "book"){
            // console.log("found book", foundBook);
            const bookItem = await collections.books.updateOne(query, { $set: item });
            if ( bookItem && bookItem.matchedCount ) {
                res.status(200).send(`Updated a book item: name ${item.name} ID ${id}.`);
            } 
        } else if (foundBook && itemtype === "shirt"){
            const itemChangedType = await collections.books.deleteOne(query);
            const itemChangedCollections = await collections.Shirts.insertOne(item);
            if (itemChangedType && itemChangedCollections){
                res.status(200).send(`Changed the item: name ${item.name} ID ${id} from book to shirt.`)
            }
        }
        const foundShirt = await collections.Shirts.findOne(query);
        if(foundShirt && itemtype === "shirt"){ 
            // console.log("found Shirt", foundShirt);
            const shirtItem = await collections.Shirts.updateOne(query, { $set: item });
            if (shirtItem && shirtItem.matchedCount) {
                res.status(200).send(`Updated a shirt item: name ${item.name} ID ${id}.`);
            } 
        } else if(foundShirt && itemtype === "book"){
            const itemChangedType = await collections.Shirts.deleteOne(query);
            const itemChangedCollections = await collections.books.insertOne(item);
            if( itemChangedType && itemChangedCollections){
                res.status(200).send(`Changed the item: name ${item.name} ID ${id} from shirt to book.`)
            }
        }else if (!foundBook && !foundShirt) {
            res.status(404).send(`Failed to find an item: ID ${id}`);
        } else {
            res.status(304).send(`Failed to update an employee: ID ${id}`);
        }
    } catch (error) {
        console.error(error.message);
        // res.status(400).send(error.message);
    }
 });

 shopRouter.post("/", async (req, res) => {
    try {
        const item = req.body;
        const itemType =req.body.itemType;
        req.body = delete req.body.itemType;
        //this deletes the itemtype before it is sent but its still used to differenciate between collections
        console.log(item, itemType, req.body);
        if (itemType === 'shirt') {
            const shirtItem = await collections.Shirts.insertOne(item);
            if(shirtItem.acknowledged){
                res.status(201).send(`Created a new shirt: ID ${shirtItem.insertedId}.`);
            } else {
                res.status(500).send("Failed to create a new shirt.");
            }
        } else if( itemType === 'book') {
            const bookItem = await collections.books.insertOne(item);
            if(bookItem.acknowledged){
                res.status(201).send(`Created a new book: ID ${bookItem.insertedId}.`);
            }else {
                res.status(500).send("Failed to create a new book.");
            }
        }
    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
 });

 shopRouter.delete("/:id",async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new mongodb.ObjectId(id) };
       const shirtItem = await collections.Shirts.deleteOne(query);
       const bookItem = await collections.books.deleteOne(query);
 
       if (shirtItem && shirtItem.deletedCount) {
           res.status(202).send(`Removed a shirt: ID ${id}`);
       } else if (bookItem && bookItem.deletedCount) {
        res.status(202).send(`Removed a book: ID ${id}`);
       } else if (!shirtItem && !bookItem) {
           res.status(400).send(`Failed to remove an Item: ID ${id}`);
       } else if (!shirtItem.deletedCount || !bookItem.deletedCount) {
           res.status(404).send(`Failed to find an Item: ID ${id}`);
       }
   } catch (error) {
       console.error(error.message);
       res.status(400).send(error.message);
   }
 });
