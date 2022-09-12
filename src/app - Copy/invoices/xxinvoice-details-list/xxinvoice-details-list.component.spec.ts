import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XxinvoiceDetailsListComponent } from './xxinvoice-details-list.component';

describe('XxinvoiceDetailsListComponent', () => {
  let component: XxinvoiceDetailsListComponent;
  let fixture: ComponentFixture<XxinvoiceDetailsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ XxinvoiceDetailsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(XxinvoiceDetailsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
