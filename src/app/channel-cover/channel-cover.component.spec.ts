import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelCoverComponent } from './channel-cover.component';

describe('ChannelCoverComponent', () => {
  let component: ChannelCoverComponent;
  let fixture: ComponentFixture<ChannelCoverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChannelCoverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChannelCoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
