import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingDetailComponent } from './billing-detail.component';

describe('BillingDetailComponent', () => {
  let component: BillingDetailComponent;
  let fixture: ComponentFixture<BillingDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillingDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BillingDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
