import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveStreamingListComponent } from './live-streaming-list.component';

describe('LiveStreamingListComponent', () => {
  let component: LiveStreamingListComponent;
  let fixture: ComponentFixture<LiveStreamingListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LiveStreamingListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveStreamingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
