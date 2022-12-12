import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Item } from '../../item';
import { ItemService } from 'src/app/item.service';
import { CartService } from 'src/app/cart/cart.service';

@Component({
  selector: 'app-shirts',
  templateUrl: './shirts.component.html',
  styleUrls: ['./shirts.component.css']
})
export class ShirtsComponent {
  items$: Observable<Item[]> = new Observable();
 
  constructor(private itemsService: ItemService, private router: Router, private cartService: CartService) { }
  
  ngOnInit(): void {
    this.fetchItems();
  }
  
  private fetchItems(): void {
    let url = "items/shirts"
    this.items$ = this.itemsService.getItems_Observable(url);
  }
  onAddToCart(item:any){
    this.cartService.onAddToCart(item);
  }
  
}
