import * as mongodb from "mongodb";

export interface Item {
    name: string;
    price: string;
    url: string;
    _id? : mongodb.ObjectId;
}