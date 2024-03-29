import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Item } from '../item';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css'],
})
export class ManagementComponent {
  items: Item[] = [];
  constructor(private itemsService: ItemService, private titleService: Title) {
    this.titleService.setTitle('Manager Portal');
  }

  ngOnInit(): void {
    this.fetchItems();
  }

  private fetchItems(): void {
    let url = 'items';
    this.itemsService.getItems_Observable(url).subscribe((items) => {
      this.items = items;
    });
  }

  deleteItem(id: any) {
    this.itemsService.deleteItem(id).subscribe({
      next: () => this.fetchItems(),
    });
  }
}
