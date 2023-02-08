import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Params } from '@angular/router';
import { CartService } from '../cart/cart.service';
import { Item } from '../item';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-single-item',
  templateUrl: './single-item.component.html',
  styleUrls: ['./single-item.component.css'],
})
export class SingleItemComponent implements OnInit {

  item$: any = [
    {
      name: 'loading...',
      price: 'loading...',
      _id: 'loading...',
      url: 'loading...',
      quantity: 'loading...',
      size: 'loading...',
    },
  ];
  //this was nessisary as the webpage couldnt read the properties of item$ before it had returned it (fetched)
  id = '';
  quant: number = 1;
  size: string = 'S';

  constructor(
    private route: ActivatedRoute,
    private itemService: ItemService,
    private cartService: CartService,
    private titleService: Title
  ) {}

  private fetchSingleItem(id: string) {
    this.itemService.getSingleItem(id).subscribe((item: Item) => {
      this.item$ = item;
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.fetchSingleItem(this.id);
    });
  }
  ngAfterViewChecked() {
    this.titleService.setTitle(this.item$.name);
  }

  onAddToCart(item: any, quant: number, size: string) {
    this.cartService.onAddToCart(item, quant, size);
  }
}
 