import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsigneeGroupComponent } from './consignee-group.component';

describe('ConsigneeGroupComponent', () => {
  let component: ConsigneeGroupComponent;
  let fixture: ComponentFixture<ConsigneeGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsigneeGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsigneeGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
