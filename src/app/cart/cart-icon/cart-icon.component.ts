import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/item';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart-icon',
  templateUrl: './cart-icon.component.html',
  styleUrls: ['./cart-icon.component.css'],
  animations: [
    trigger('cartState', [
      state('normal', style({})),
      state('bump', style({
        // animation: bump '300ms' 'ease-out',
      })),
      transition('normal => bump', [animate(300, keyframes([
        style({transform: 'scale(1)'}),
        style({transform: 'scale(0.9)'}),
        style({transform: 'scale(1.1)'}),
        style({transform: 'scale(1.15)'}),
        style({transform: 'scale(1)'}),
      ]))]),
      transition('bump => normal', animate(0))
    ])
  ]
})
export class CartIconComponent implements OnInit {
  state = 'normal';
  cartItemNumber : number = 0;
  item : Item[] = [];
  constructor(private cartService: CartService){ }

  ngOnInit(): void {
    this.cartItemNumber = this.cartService.getCurrentCart.length;
    this.cartService.cartNumberItems.subscribe((num:number) => {
      this.cartItemNumber = num;
      this.state = 'bump';
      setTimeout(() => {this.state = 'normal'}, 300)
      });
  }
} 
