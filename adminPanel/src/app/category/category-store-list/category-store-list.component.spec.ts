import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryStoreListComponent } from './category-store-list.component';

describe('CategoryStoreListComponent', () => {
  let component: CategoryStoreListComponent;
  let fixture: ComponentFixture<CategoryStoreListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryStoreListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryStoreListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
