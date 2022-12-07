import * as mongodb from "mongodb";

export interface Item {
    name: string;
    price: string;
    description: string;
    _id? : mongodb.ObjectId;
}