import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { Item } from '../item';
 
@Component({
 selector: 'app-item-form',
 templateUrl: './item-form.component.html',
 styleUrls: [ './item-form.component.css' ]
})
export class ItemFormComponent implements OnInit {
 @Input()
 initialState: BehaviorSubject<Item> = new BehaviorSubject({});
 
 @Output()
 formValuesChanged = new EventEmitter<Item>();
 
 @Output()
 formSubmitted = new EventEmitter<Item>();
 
 itemForm: FormGroup = new FormGroup({});
 
 constructor(private fb: FormBuilder) { }
 
 get name() { return this.itemForm.get('name')!; }
 get price() { return this.itemForm.get('price')!; }
 get description() { return this.itemForm.get('description')!; }
 
 ngOnInit() {
   this.initialState.subscribe(item => {
     this.itemForm = this.fb.group({
       name: [ item.name, [Validators.required] ],
       price: [ item.price, [ Validators.required ] ],
       description: [ item.description, [Validators.required] ]
     });
   });
 
   this.itemForm.valueChanges.subscribe((val) => { this.formValuesChanged.emit(val); });
 }
 
 submitForm() {
   this.formSubmitted.emit(this.itemForm.value);
 }
}
