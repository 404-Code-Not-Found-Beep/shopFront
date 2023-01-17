import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementEditItemComponent } from './management-edit-item.component';

describe('ManagementEditItemComponent', () => {
  let component: ManagementEditItemComponent;
  let fixture: ComponentFixture<ManagementEditItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagementEditItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagementEditItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
