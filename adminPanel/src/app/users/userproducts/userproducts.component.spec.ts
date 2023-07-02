import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserproductsComponent } from './userproducts.component';

describe('UserproductsComponent', () => {
  let component: UserproductsComponent;
  let fixture: ComponentFixture<UserproductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserproductsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserproductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
