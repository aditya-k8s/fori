import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyInfluencerPageComponent } from './my-influencer-page.component';

describe('MyInfluencerPageComponent', () => {
  let component: MyInfluencerPageComponent;
  let fixture: ComponentFixture<MyInfluencerPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyInfluencerPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyInfluencerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
