import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CartService } from '../cart/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})



export class CheckoutComponent implements OnInit {
 currentCart: any = []
 cartTotal : number = 0;
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
}

