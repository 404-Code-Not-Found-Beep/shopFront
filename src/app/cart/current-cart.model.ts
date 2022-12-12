import { Item } from "../item";

export class CurrentCartModel {
    public itemsArray : Item[] = []

    
    public get cartTotal() : number {
        let total = 0;
        for  (let item of this.itemsArray){
            total += +item.price;
        }
        return total;
    }
    
    getCurrentCartTotal(){}
}