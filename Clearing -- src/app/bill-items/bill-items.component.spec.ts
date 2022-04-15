import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClearingItemsComponent } from './bill-items.component';

describe('ClearingItemsComponent', () => {
  let component: ClearingItemsComponent;
  let fixture: ComponentFixture<ClearingItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClearingItemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClearingItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
