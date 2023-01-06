import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Item } from '../../item';
import { ItemService } from 'src/app/item.service';
import { CartService } from 'src/app/cart/cart.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent {
  items$: Observable<Item[]> = new Observable();
  quant = 1;
  
  constructor(private itemsService: ItemService, private router: Router, private cartService: CartService) { }
  
  ngOnInit(): void {
    this.fetchItems();
  }
  
  private fetchItems(): void {
    let url = "items/books"
    this.items$ = this.itemsService.getItems_Observable(url);
  }

  onAddToCart(item:any, quant:number){
    this.cartService.onAddToCart(item, quant);
  }
  nav(item:Item){
    this.router.navigate([item._id]);
  }
 
}
