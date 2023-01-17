import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
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

  constructor(
    private itemsService: ItemService,
    private router: Router,
    private titleService: Title
  ) {
    this.titleService.setTitle('Shop');
  }

  ngOnInit(): void {}

  onClickShirt() {
    this.router.navigate(['/shirts']);
  }
  onClickBook() {
    this.router.navigate(['/books']);
  }
}
