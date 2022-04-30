import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClearingItemListComponent } from './bill-item-list.component';

describe('ClearingItemListComponent', () => {
  let component: ClearingItemListComponent;
  let fixture: ComponentFixture<ClearingItemListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClearingItemListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClearingItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
