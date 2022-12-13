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

 private itemsChangedSub : Subscription = new Subscription();
 currentCart : Item[] = [];
  cartTotal : number = 0;
  cartTaxShip : number = 0;
  
 constructor(private cartService: CartService) { }
 
 ngOnInit(): void {
  this.cartTotal = this.cartService.getCurrentCartTotal();
  this.currentCart = this.cartService.getCurrentCart();
  this.cartTaxShip = this.cartService.getTaxShip(this.cartTotal);
  this.changed();

 }

 changed(){
  this.itemsChangedSub = this.cartService.itemsChangedSubject.subscribe(
    (items: Item[]) => {
      this.currentCart = items;
    }
   );
  this.cartTotal = this.cartService.getCurrentCartTotal();
  this.cartTaxShip = this.cartService.getTaxShip(this.cartTotal);
 }
 
 deleteItem(item : Item){
  this.cartService.deleteItem(item);
  this.changed();
 }

 clearCart(){
  this.cartService.clearCart();
  this.cartTotal = 0;
  this.changed();
 }

 reduceQuant(item: Item){
  this.cartService.reduceQuant(item);
  this.changed();
 }
 addQuant(item:Item){
  this.cartService.onAddToCart(item, 1);
  this.changed();
 }
}

