import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Item } from 'src/app/item';
import { Location } from '@angular/common';

@Component({
  selector: 'app-management-form',
  templateUrl: './management-form.component.html',
  styleUrls: ['./management-form.component.css'],
})
export class ManagementFormComponent {
  @Input()
  initialState: BehaviorSubject<any> = new BehaviorSubject({
    name: '',
    price: null,
    location: '',
  });

  @Output()
  formValuesChanged = new EventEmitter<Item>();

  @Output()
  formSubmitted = new EventEmitter<Item>();

  urlInput = '';

  managementForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder, private location: Location) {}

  get name() {
    return this.managementForm.get('name')!;
  }
  get price() {
    return this.managementForm.get('price')!;
  }
  get url() {
    return this.managementForm.get('url')!;
  }
  get itemType() {
    return this.managementForm.get('itemType')!;
  }

  ngOnInit() {
    this.initialState.subscribe((item) => {
      this.managementForm = this.fb.group({
        name: [item.name, [Validators.required]],
        price: [item.price, [Validators.required]],
        url: [item.url, [Validators.required]],
        itemType: [item.itemType, [Validators.required]],
      });
    });

    this.managementForm.valueChanges.subscribe((val) => {
      this.formValuesChanged.emit(val);
    });
  }

  submitForm() {
    this.formSubmitted.emit(this.managementForm.value);
  }
  backButton() {
    this.location.back();
  }
  noImageButton() {
    this.urlInput = '../../assets/Image_Coming_Soon.jpg';
  }
}
