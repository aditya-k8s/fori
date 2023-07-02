import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMoreInfluencersComponent } from './view-more-influencers.component';

describe('ViewMoreInfluencersComponent', () => {
  let component: ViewMoreInfluencersComponent;
  let fixture: ComponentFixture<ViewMoreInfluencersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewMoreInfluencersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMoreInfluencersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
