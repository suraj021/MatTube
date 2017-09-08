import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoTitleComponent } from './video-title.component';

describe('VideoTitleComponent', () => {
  let component: VideoTitleComponent;
  let fixture: ComponentFixture<VideoTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoTitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
