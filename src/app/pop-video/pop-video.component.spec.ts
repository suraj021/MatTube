import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopVideoComponent } from './pop-video.component';

describe('PopVideoComponent', () => {
  let component: PopVideoComponent;
  let fixture: ComponentFixture<PopVideoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopVideoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
