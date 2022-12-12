import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Item } from '../item';
import { ItemService } from '../item.service';
@Component({
  selector: 'app-items-list',
  templateUrl: './store-front.component.html',
 
})
export class StoreFrontComponent implements OnInit {
 items$: Observable<Item[]> = new Observable();
 
 constructor(private itemsService: ItemService, private router: Router) { }
 
 ngOnInit(): void {
  //  this.fetchItems();
 }
 
//  private fetchItems(): void {
//    this.items$ = this.itemsService.getItems_Observable();
//  }

 onClickShirt(){
  this.router.navigate(['/shirts']);
 }
 onClickBook(){
  this.router.navigate(['/books']);
 }
}
