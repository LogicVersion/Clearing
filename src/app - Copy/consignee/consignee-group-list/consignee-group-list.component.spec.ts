import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsigneeGroupListComponent } from './consignee-group-list.component';

describe('ConsigneeGroupListComponent', () => {
  let component: ConsigneeGroupListComponent;
  let fixture: ComponentFixture<ConsigneeGroupListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsigneeGroupListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsigneeGroupListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
