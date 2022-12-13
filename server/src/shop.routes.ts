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
//this could be used with the search bar fnctionality
// shopRouter.get('/:id', async (req,res) => {
//     try {
//         const id = req?.params?.id;
//         const query = {_id: new mongodb.ObjectId(id) };
//         const item = await collections.items.findOne(query);

//         if (item) {
//             res.status(200).send(item);
//         } else {
//             res.status(404).send(`Failed to find an item: ID ${id}`);
//         }
//     } catch (error) {
//         res.status(404).send(`Failed to find an item: ID ${req?.params?.id}`);
//     }
// });
