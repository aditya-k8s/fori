import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListchannelsComponent } from './listchannels.component';

describe('ListchannelsComponent', () => {
  let component: ListchannelsComponent;
  let fixture: ComponentFixture<ListchannelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListchannelsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListchannelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
