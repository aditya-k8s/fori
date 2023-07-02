import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptedBroadcastComponent } from './accepted-broadcast.component';

describe('AcceptedBroadcastComponent', () => {
  let component: AcceptedBroadcastComponent;
  let fixture: ComponentFixture<AcceptedBroadcastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcceptedBroadcastComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AcceptedBroadcastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
