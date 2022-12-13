import { ThisReceiver } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Item } from '../item';
import { CurrentCartModel } from './current-cart.model';

@Injectable({
  providedIn: 'root'
})

export class CartService {
  itemsChangedSubject = new Subject<Item[]>();

  currentCartTotal: number = 0;
  itemsArray : Item[] = [];
  constructor() { }

  onAddToCart(item: Item, quant: number, size? : string){
    if(size){
      item.size= size;
    } 
    // if any of the items in cart have the same id then make quantity +1 else 
    item.quantity = quant;
    this.itemsArray.push(item);
    this.currentCartTotal += +item.price;
    this.itemsChangedSubject.next(this.itemsArray.slice());
  }

  getCurrentCart(){
    return this.itemsArray.slice();
  }

  getCurrentCartTotal(){
    return this.currentCartTotal;
  }

  getTaxShip(){
    return (this.currentCartTotal * 1.1) + 20;
  }
  clearCart(){
    this.currentCartTotal = 0;
    this.itemsChangedSubject.next(this.itemsArray=[]);
  }

  deleteItem(item : Item){
    let index = this.itemsArray.findIndex((x) => {
      x === item;
    });
    return this.itemsArray.splice(index, 1);


    // console.log(this.itemsArray, _id);
  }
}
