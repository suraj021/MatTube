import { LocationService } from './services/location.service';
import { TuberService } from './services/tuber.service';
import { SummaryPipe } from './summary.pipe';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SearchComponent } from './search/search.component';
import { HomeComponent } from './home/home.component';
import { ResultRowComponent } from './result-row/result-row.component';
import { HttpModule } from "@angular/http";
import { PopularComponent } from './popular/popular.component';
import { PopVideoComponent } from './pop-video/pop-video.component';
import { WatchComponent } from './watch/watch.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { VideoTitleComponent } from './video-title/video-title.component';
import { VideoDescriptionComponent } from './video-description/video-description.component';
import { RecommendedComponent } from './recommended/recommended.component';
import { EmbedComponent } from './embed/embed.component';
import { CommentsComponent } from './comments/comments.component';
import { DurationPipe } from './duration.pipe';
import { LoaderComponent } from './loader/loader.component';
import { LoadingComponent } from './loading/loading.component';
import { ConverterPipe } from './converter.pipe';
import { DateConverterPipe } from './date-converter.pipe';
import { FooterComponent } from './footer/footer.component';
import { ChannelComponent } from './channel/channel.component';
import { ChannelCoverComponent } from './channel-cover/channel-cover.component';
import { ChannelDataComponent } from './channel-data/channel-data.component';
import { ChannelAboutComponent } from './channel-about/channel-about.component';
import { ChannelVideosComponent } from './channel-videos/channel-videos.component';
import { ChannelFeaturedComponent } from './channel-featured/channel-featured.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { ChannelPlaylistsComponent } from './channel-playlists/channel-playlists.component';
import { AboutComponent } from './about/about.component';

const routes: Routes= [
  { path: "", component: HomeComponent },
  { path: "home", component: HomeComponent },
  { path: "search", component: SearchComponent },
  { path: "watch", component: WatchComponent },
  { path: "channel/:id", component: ChannelComponent },
  { path: "playlist", component:PlaylistComponent },
  { path: "about", component: AboutComponent },
  { path: "**", component: NotFoundComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SearchComponent,
    HomeComponent,
    ResultRowComponent,
    SummaryPipe,
    PopularComponent,
    PopVideoComponent,
    WatchComponent,
    NotFoundComponent,
    VideoTitleComponent,
    VideoDescriptionComponent,
    RecommendedComponent,
    EmbedComponent,
    CommentsComponent,
    DurationPipe,
    LoaderComponent,
    LoadingComponent,
    ConverterPipe,
    DateConverterPipe,
    FooterComponent,
    ChannelComponent,
    ChannelCoverComponent,
    ChannelDataComponent,
    ChannelAboutComponent,
    ChannelVideosComponent,
    ChannelFeaturedComponent,
    PlaylistComponent,
    ChannelPlaylistsComponent,
    AboutComponent
  ],
  imports: [
    HttpModule,
    BrowserModule,
    MDBBootstrapModule.forRoot(),
    RouterModule.forRoot( routes )
  ],
  providers: [
    TuberService,
    LocationService
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  bootstrap: [AppComponent]
})
export class AppModule { }
