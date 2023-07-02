import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpcomingLiveStreamComponent } from './upcoming-live-stream.component';

describe('UpcomingLiveStreamComponent', () => {
  let component: UpcomingLiveStreamComponent;
  let fixture: ComponentFixture<UpcomingLiveStreamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpcomingLiveStreamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpcomingLiveStreamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
