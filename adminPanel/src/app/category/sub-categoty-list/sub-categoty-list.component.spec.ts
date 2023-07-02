import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubCategotyListComponent } from './sub-categoty-list.component';

describe('SubCategotyListComponent', () => {
  let component: SubCategotyListComponent;
  let fixture: ComponentFixture<SubCategotyListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubCategotyListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubCategotyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
