import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Item } from '../item';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  itemsChangedSubject = new Subject<Item[]>();
  cartNumberItems = new Subject<number>();

  itemsArray: Item[] = [];
  cartNumberofItems:number = 0
  constructor() {}

  onAddToCart(item: Item, quant: number, size?: string) {
    let itemToAdd = JSON.parse(JSON.stringify(item));
    if (size) {
      itemToAdd.size = size;
    }
    let index = this.itemsArray.findIndex(
      (x) => x._id === itemToAdd._id && x.size === itemToAdd.size
    );
    if (index !== -1) {
      this.itemsArray[index].quantity += quant;
      this.cartNumberItems.next(this.cartNumberofItems += quant);
      this.itemsChangedSubject.next(this.itemsArray);
      return;
    } else itemToAdd.quantity = quant;
    this.cartNumberItems.next(this.cartNumberofItems += quant);
    this.itemsArray.push(itemToAdd);
    this.itemsChangedSubject.next(this.itemsArray);
  }

  getCurrentCart() {
    return this.itemsArray;
  }

  getCurrentCartTotal() {
    let total = 0;
    for (let i of this.itemsArray) {
      if (i.quantity > 1) {
        total += +i.price * i.quantity;
      } else {
        total += +i.price;
      }
    }
    return total;
  }

  getTaxShip(total: number) {
    return total * 1.1 + 20;
  }

  clearCart() {
    this.itemsChangedSubject.next((this.itemsArray = []));
    this.cartNumberItems.next(this.cartNumberofItems = 0);
  }

  deleteItem(item: Item) {
    let index = this.itemsArray.findIndex((x) => x === item);
    this.itemsArray.splice(index, 1);
    this.itemsChangedSubject.next(this.itemsArray);
    this.cartNumberItems.next(this.cartNumberofItems -= 1); 
  }

  reduceQuant(item: Item) {
    if (item.size) {
      let index = this.itemsArray.findIndex(
        (x) => x._id === item._id && x.size === item.size
      );
      this.itemsArray[index].quantity--;
      this.cartNumberItems.next(this.cartNumberofItems -= 1); 
       
    } else {
      let index = this.itemsArray.findIndex((x) => x._id === item._id);
      this.itemsArray[index].quantity--;
      this.cartNumberItems.next(this.cartNumberofItems -=1 ); 

    }
  }
}
