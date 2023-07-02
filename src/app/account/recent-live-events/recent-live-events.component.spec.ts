import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentLiveEventsComponent } from './recent-live-events.component';

describe('RecentLiveEventsComponent', () => {
  let component: RecentLiveEventsComponent;
  let fixture: ComponentFixture<RecentLiveEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecentLiveEventsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentLiveEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
