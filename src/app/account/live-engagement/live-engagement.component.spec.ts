import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveEngagementComponent } from './live-engagement.component';

describe('LiveEngagementComponent', () => {
  let component: LiveEngagementComponent;
  let fixture: ComponentFixture<LiveEngagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LiveEngagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveEngagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
