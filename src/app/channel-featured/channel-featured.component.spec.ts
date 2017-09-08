import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelFeaturedComponent } from './channel-featured.component';

describe('ChannelFeaturedComponent', () => {
  let component: ChannelFeaturedComponent;
  let fixture: ComponentFixture<ChannelFeaturedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChannelFeaturedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChannelFeaturedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
