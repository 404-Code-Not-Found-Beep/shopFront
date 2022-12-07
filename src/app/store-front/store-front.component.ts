import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from '../item';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-items-list',
  templateUrl: './store-front.component.html',
 
})
export class StoreFrontComponent implements OnInit {
 items$: Observable<Item[]> = new Observable();
 
 constructor(private itemsService: ItemService) { }
 
 ngOnInit(): void {
   this.fetchItems();
 }
 
 deleteItem(id: string): void {
   this.itemsService.deleteItem(id).subscribe({
     next: () => this.fetchItems()
   });
 }
 
 private fetchItems(): void {
   this.items$ = this.itemsService.getItems();
 }
}
