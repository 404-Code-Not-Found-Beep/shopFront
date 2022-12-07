import * as express from "express";
import * as mongodb from "mongodb";
import { collections } from "./database";

export const shopRouter = express.Router();
shopRouter.use(express.json());

shopRouter.get('/', async (req, res) => {
    try {
        const items = await collections.items.find({}).toArray();
        res.status(200).send(items);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

shopRouter.get('/:id', async (req,res) => {
    try {
        const id = req?.params?.id;
        const query = {_id: new mongodb.ObjectId(id) };
        const item = await collections.items.findOne(query);

        if (item) {
            res.status(200).send(item);
        } else {
            res.status(404).send(`Failed to find an item: ID ${id}`);
        }
    } catch (error) {
        res.status(404).send(`Failed to find an item: ID ${req?.params?.id}`);
    }
});

shopRouter.post('/', async (req, res) => {
    try {
        const item = req.body;
        const result = await collections.items.insertOne(item);
  
        if (result.acknowledged) {
            res.status(201).send(`Created a new item: ID ${result.insertedId}.`);
        } else {
            res.status(500).send("Failed to create a new item.");
        }
    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
 });