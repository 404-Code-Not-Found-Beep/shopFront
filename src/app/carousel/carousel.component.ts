import { Observable } from 'rxjs';
import { Item } from '../item';
import { ItemService } from '../item.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {
  // items$: Observable<Item[]> = new Observable();
  items : Item[] = [];
	responsiveOptions;

	constructor(private itemsService: ItemService) { 
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
  // this.items = this.itemsService.getItems_Array();
  let url = "items"
   this.itemsService.getItems_Observable(url).subscribe(items => { this.items = items });
 }

 onClick(product:any){
  console.log(product);
 }
}
 