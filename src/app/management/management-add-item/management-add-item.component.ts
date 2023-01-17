import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Item } from 'src/app/item';
import { ItemService } from 'src/app/item.service';

@Component({
  selector: 'app-management-add-item',
  templateUrl: './management-add-item.component.html',
  styleUrls: ['./management-add-item.component.css'],
})
export class ManagementAddItemComponent {
  constructor(private router: Router, private itemService: ItemService) {}

  addItem(item: Item) {
    this.itemService.createItem(item).subscribe({
      next: () => {
        this.router.navigate(['/home']);
      },
      error: (error) => {
        alert('Failed to create item');
        console.error(error);
        if (error) {
          console.log(error.message);
        }
      },
    });
  }
}
