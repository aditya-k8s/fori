import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListllivestreamComponent } from './listllivestream.component';

describe('ListllivestreamComponent', () => {
  let component: ListllivestreamComponent;
  let fixture: ComponentFixture<ListllivestreamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListllivestreamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListllivestreamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
