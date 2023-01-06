import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementAddItemComponent } from './management-add-item.component';

describe('ManagementAddItemComponent', () => {
  let component: ManagementAddItemComponent;
  let fixture: ComponentFixture<ManagementAddItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagementAddItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagementAddItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
