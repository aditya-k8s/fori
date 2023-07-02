import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpcomingStreamingListComponent } from './upcoming-streaming-list.component';

describe('UpcomingStreamingListComponent', () => {
  let component: UpcomingStreamingListComponent;
  let fixture: ComponentFixture<UpcomingStreamingListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpcomingStreamingListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpcomingStreamingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
