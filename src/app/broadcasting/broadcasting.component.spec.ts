import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BroadcastingComponent } from './broadcasting.component';

describe('BroadcastingComponent', () => {
  let component: BroadcastingComponent;
  let fixture: ComponentFixture<BroadcastingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BroadcastingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BroadcastingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
