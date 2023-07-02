import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoresBrandsComponent } from './stores-brands.component';

describe('StoresBrandsComponent', () => {
  let component: StoresBrandsComponent;
  let fixture: ComponentFixture<StoresBrandsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoresBrandsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoresBrandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
