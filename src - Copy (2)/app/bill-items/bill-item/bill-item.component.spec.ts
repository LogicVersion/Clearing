import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClearingItemComponent } from './bill-item.component';

describe('ClearingItemComponent', () => {
  let component: ClearingItemComponent;
  let fixture: ComponentFixture<ClearingItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClearingItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClearingItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
