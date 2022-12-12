import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CartService } from '../cart/cart.service';
import { Item } from '../item';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})



export class CheckoutComponent implements OnInit {
 currentCart: any = []
 cartTotal : number = 0;
 cartTotalTaxShip : number = 0;
 constructor(private cartService: CartService) { }
 
 ngOnInit(): void {
   this.getCurrentCart();
   this.getTotal();
 }
 
 getCurrentCart(){
 this.currentCart = this.cartService.getCurrentCart();
 }

 getTotal(){
  this.cartTotal = this.cartService.getCurrentCartTotal();
 }
 deleteItem(item : Item){
  this.currentCart.splice(item, 1)
  this.cartTotal = this.cartTotal - +item.price;
  // this.getTotal();
  // console.log(this.currentCart);
  // this.cartService.deleteItem(id);
 }

 clearCart(){
  // this.cartService.clearCart();

  this.currentCart = [];
  this.cartTotal = 0;
  console.log(this.currentCart);
 }
}

