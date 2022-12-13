import { Observable } from 'rxjs';
import { Item } from '../item';
import { ItemService } from '../item.service';
import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart/cart.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {
  items : Item[] = [];
	responsiveOptions;
  size:string = '';

	constructor(private itemsService: ItemService, private cartService: CartService, private router: Router) { 
		this.responsiveOptions = [
            {
                breakpoint: '1024px',
                numVisible: 3,
                numScroll: 3
            },
            {
                breakpoint: '768px',
                numVisible: 2,
                numScroll: 2
            },
            {
                breakpoint: '560px',
                numVisible: 1,
                numScroll: 1
            }
        ];
	}
 
 
 
 ngOnInit(): void {
  this.fetchItems();
 }
 
 private fetchItems(): void {
  let url = "items"
   this.itemsService.getItems_Observable(url).subscribe(items => { this.items = items });
 }

 quickAdd(product:any, size?:string){
  this.cartService.onAddToCart(product, 1, size)
  console.log(product);
 }
 nav(product:any){
  if(product.price > 15){
    this.router.navigate(['/shirts']);
  } else{
    this.router.navigate(['/books']);
  }
 }
}
 