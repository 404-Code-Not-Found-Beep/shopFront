import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Item } from 'src/app/item';
import { ItemService } from 'src/app/item.service';

@Component({
  selector: 'app-management-edit-item',
  templateUrl: './management-edit-item.component.html',
  styleUrls: ['./management-edit-item.component.css']
})
export class ManagementEditItemComponent {
  item: BehaviorSubject<any> = new BehaviorSubject({});
 
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private itemService : ItemService,
  ) { }
  
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      alert('No id provided');
    }
  
    this.itemService.getSingleItem(id !).subscribe((item) => {
      this.item.next(item);
    });
  }
  
  editEmployee(item: Item) {
    this.itemService.updateItem(this.item.value._id || '', item)
      .subscribe({
        next: () => {
          this.router.navigate(['/home']);
        },
        error: (error) => {
          alert('Failed to update employee');
          console.error(error);
        }
      })
  }
 }