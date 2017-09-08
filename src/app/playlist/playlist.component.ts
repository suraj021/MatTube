import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Playlist } from './../playlist';
import { TuberService } from './../services/tuber.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Video } from "../video";

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit {

  public error: boolean;
  public error2: boolean;
  public loadLeft: boolean;
  private id: string;
  private _ids: string;
  private url: string;
  public message: string;
  public message2: string;
  public loadlist: boolean;
  public playlist: Playlist;
  private API_KEY = "AIzaSyDHwyYH0nFYdQEPMi5a5C5WCIspc6ttmGA";

  constructor(private _route: ActivatedRoute, private _tuber: TuberService) { 
    this.message= "No Playlist Id";
    this.message2= "No Playlist";
  }

  ngOnInit() {

    this.loadlist= true;
    this.loadLeft= true;

    this._route.queryParams
      .subscribe(
        (params: Params) => {
          this.id = params['list'];

          //console.log(this.id);

          if( this.id== null ){
            this.loadLeft= false;
            this.loadlist= false;
            this.error= true;
            return;
          }


          this.playlist = new Playlist();

          this.playlist.id = this.id;

          let pageToken = "";
          let i = 0;
          this.playlist.videos = [];

          this.getPlaylistInfo();

        }
      )

  }


  getPlaylistItems(i: number, pageToken: string) {

    if (i == 0)
      this.url = "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=7&playlistId="+ this.id + "&key=" + this.API_KEY;
    else {
      this.url = "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=7&pageToken=" + pageToken + "&playlistId="+ this.id + "&key=" + this.API_KEY;
    }

    //console.log( this.url );

    if( i!= 0 && pageToken== "" ){
      //console.log( this.playlist.videos );
      this.loadlist= false;
      return;
    }

    //console.log(this.url);

    this._tuber.get(this.url)
      .subscribe(
        response => {
          //console.log(response.items);

          if (response.nextPageToken != null) {
            pageToken = response.nextPageToken;
          } else {
            pageToken = "";
          }

          //console.log("NextPage " + pageToken);

          response= response.items;

          for( let i= 0; i< response.length; ++i ){
            let video= new Video();
            video.id= response[i].snippet.resourceId.videoId;
            video.channelId= response[i].snippet.channelId;
            video.title= response[i].snippet.title;
            video.thumbnail_url= response[i].snippet.thumbnails.medium.url;
            video.channelTitle= response[i].snippet.channelTitle;

            this.playlist.videos.push( video );
          }

          this.getPlaylistItems( i+1, pageToken );

        }
      )

  }

  getPlaylistInfo(){

    let url2= "https://www.googleapis.com/youtube/v3/playlists?part=snippet,contentDetails&id=" + this.playlist.id + "&key=" + this.API_KEY;

    this._tuber.get( url2 )
      .subscribe(
        response=>{

          if( response.items.length == 0 ){
            this.error2= true;
            this.loadLeft= this.loadlist= false;
            return;
          }

          response= response.items[0];

          this.playlist.id= response.id;
          this.playlist.channelId= response.snippet.channelId;
          this.playlist.title= response.snippet.title;
          this.playlist.description= response.snippet.description;
          this.playlist.thumbnail= response.snippet.thumbnails.medium.url;
          this.playlist.channelTitle= response.snippet.channelTitle;
          this.playlist.itemCount= response.contentDetails.itemCount;
          this.playlist.publishedAt= response.snippet.publishedAt;

          this.getPlaylistItems( 0,"" );
          this.getChannelInfo();

        },
        error=> {
          this.error= true;
        }
      )

  }

  getChannelInfo(){
    let url3= "https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=" + this.playlist.channelId + "&key=" + this.API_KEY;
  
    //console.log( url3 );

    this._tuber.get( url3 )
      .subscribe( 
        response=> {
          response= response.items[0];

          this.playlist.channelThumbnail= response.snippet.thumbnails.default.url;
          this.playlist.channelSubscribers= response.statistics.subscriberCount;

          this.loadLeft= false;

        }
      )
  
  }



}
