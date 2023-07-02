import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelStreamComponent } from './channel-stream.component';

describe('ChannelStreamComponent', () => {
  let component: ChannelStreamComponent;
  let fixture: ComponentFixture<ChannelStreamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChannelStreamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChannelStreamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
