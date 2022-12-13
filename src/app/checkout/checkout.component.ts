import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { CartService } from '../cart/cart.service';
import { Item } from '../item';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})



export class CheckoutComponent implements OnInit {
 public itemsChangedSub : Subscription = new Subscription();
//  itemsObservable : Observable<Item[]> = new Observable();
  cartTotal = this.cartService.getCurrentCartTotal();
  currentCart = this.cartService.getCurrentCart();
  cartTotalTaxShip = this.cartService.getTaxShip();
 constructor(private cartService: CartService) { }
 
 ngOnInit(): void {
  // this.cartTotal;
  // this.currentCart;
  // this.cartTotalTaxShip;


  //  this.itemsChangedSub = this.cartService.itemsChangedSubject.subscribe(
  //   (items: Item[]) => {
  //     this.currentCart = items;
  //   }
  //  );
  //  this.cartTotalTaxShip = (this.cartTotal * 1.1) + 20;

  //  this.itemsObservable = this.cartService.itemsChangedSubject;
 }
 
//  getCurrentCart(){
//  this.currentCart = this.cartService.getCurrentCart();
//  }

//  getTotal(){
//   this.cartTotal = this.cartService.getCurrentCartTotal();
//   this.cartTotalTaxShip = (this.cartTotal * 1.1) + 20;

//  }
 deleteItem(item : Item){
  // this.currentCart.splice(item, 1)
  // this.getTotal();
  // console.log(this.currentCart);
  // this.cartTotal = this.cartTotal - +item.price;
  this.cartService.deleteItem(item);
  this.cartTotal;
  this.currentCart;
 }

 clearCart(){
  this.cartService.clearCart();
  this.cartTotal = 0;
  console.log(this.currentCart);
 }
}

