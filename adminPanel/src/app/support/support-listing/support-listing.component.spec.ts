import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportListingComponent } from './support-listing.component';

describe('SupportListingComponent', () => {
  let component: SupportListingComponent;
  let fixture: ComponentFixture<SupportListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupportListingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupportListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
