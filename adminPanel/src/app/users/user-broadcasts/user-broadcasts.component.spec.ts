import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserBroadcastsComponent } from './user-broadcasts.component';

describe('UserBroadcastsComponent', () => {
  let component: UserBroadcastsComponent;
  let fixture: ComponentFixture<UserBroadcastsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserBroadcastsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserBroadcastsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
