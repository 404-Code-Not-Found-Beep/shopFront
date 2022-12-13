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

  // currentCartTotal: number = 0;
  itemsArray : Item[] = [];
  constructor() { }

  onAddToCart(item: Item, quant: number, size? : string){
    let itemToAdd = JSON.parse(JSON.stringify(item));
    if(size){
      itemToAdd.size = size;
    } 
    let index = this.itemsArray.findIndex(x => x._id === itemToAdd._id && x.size === itemToAdd.size);
    if (index !== -1){
      this.itemsArray[index].quantity += quant;
    this.itemsChangedSubject.next(this.itemsArray);

      return;
    } else
    itemToAdd.quantity = quant;
    this.itemsArray.push(itemToAdd);
    this.itemsChangedSubject.next(this.itemsArray);
  }

  getCurrentCart(){
    return this.itemsArray;
  }

  getCurrentCartTotal(){
    let total = 0;
    for (let i of this.itemsArray) {
      if (i.quantity > 1){
        total += +i.price * i.quantity;
      } else {
        total += +i.price;
      }
    }
    console.log(total);
    return total;
  }

  getTaxShip(total: number){
    return (total * 1.1) + 20;
  }

  clearCart(){
    this.itemsChangedSubject.next(this.itemsArray=[]);
  }

  deleteItem(item : Item){
    let index = this.itemsArray.findIndex(x => x === item);
    this.itemsArray.splice(index, 1);
    this.itemsChangedSubject.next(this.itemsArray);
  }

  reduceQuant(item: Item) {
    if (item.size) {
      let index = this.itemsArray.findIndex(x => x._id === item._id && x.size === item.size);
      this.itemsArray[index].quantity --;
    } else {
      let index = this.itemsArray.findIndex(x => x._id === item._id);
      this.itemsArray[index].quantity --;
    }
  }
  
}
