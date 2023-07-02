import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetailerFeeComponent } from './retailer-fee.component';

describe('RetailerFeeComponent', () => {
  let component: RetailerFeeComponent;
  let fixture: ComponentFixture<RetailerFeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetailerFeeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RetailerFeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
