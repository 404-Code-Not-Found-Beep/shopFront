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

  onAddToCart(item: Item){
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
  clearCart(){}
}
