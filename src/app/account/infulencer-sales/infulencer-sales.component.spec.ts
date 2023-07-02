import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfulencerSalesComponent } from './infulencer-sales.component';

describe('InfulencerSalesComponent', () => {
  let component: InfulencerSalesComponent;
  let fixture: ComponentFixture<InfulencerSalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfulencerSalesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfulencerSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
