import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelPlaylistsComponent } from './channel-playlists.component';

describe('ChannelPlaylistsComponent', () => {
  let component: ChannelPlaylistsComponent;
  let fixture: ComponentFixture<ChannelPlaylistsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChannelPlaylistsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChannelPlaylistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
