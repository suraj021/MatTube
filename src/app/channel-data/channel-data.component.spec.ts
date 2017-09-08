import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelDataComponent } from './channel-data.component';

describe('ChannelDataComponent', () => {
  let component: ChannelDataComponent;
  let fixture: ComponentFixture<ChannelDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChannelDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChannelDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
