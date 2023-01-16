import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Item } from '../../item';
import { ItemService } from 'src/app/item.service';
@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent implements OnInit {
  searchBar = '';
  searchBarItems: any;
  id = '';
  ngOnInit(): void {
    this.fetchItems();
  }
  constructor(private itemsService: ItemService, private router: Router) {}

  private fetchItems(): void {
    this.itemsService.searchBarGetItems().subscribe((items: Item[]) => {
      this.searchBarItems = items;
    });
  }
  nav(item: Item) {
    this.router.navigate([item._id]);
    this.searchBar = '';
  }
}
