import { ThisReceiver } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Item } from '../item';
import { CurrentCartModel } from './current-cart.model';

@Injectable({
  providedIn: 'root'
})

export class CartService {
  // cartModel : CurrentCartModel = new CurrentCartModel();
  currentCartTotal: number = 0;
  itemsArray : Item[] = [];
  constructor() { }

  onAddToCart(item: Item, quant: number, size? : string){
    if(size){
      item.size= size;
    } 
    item.quantity = quant;
    this.itemsArray.push(item);
    console.log(this.itemsArray);
    this.currentCartTotal += +item.price;
  }

  getCurrentCart(){
    return this.itemsArray;
  }
  getCurrentCartTotal(){
    return this.currentCartTotal;
  }
  // clearCart(){
  //   return this.itemsArray = [];
  //   return this.currentCartTotal = 0;
  // }

  // deleteItem(_id: string){
  //   // return this.itemsArray.splice(this.itemsArray._id, 1);
  //   console.log(this.itemsArray, _id);
  // }
}
