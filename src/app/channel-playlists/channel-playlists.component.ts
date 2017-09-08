import { Playlist } from './../playlist';
import { Channel } from './../channel';
import { TuberService } from './../services/tuber.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'channel-playlists',
  templateUrl: './channel-playlists.component.html',
  styleUrls: ['./channel-playlists.component.scss']
})
export class ChannelPlaylistsComponent implements OnInit {

  private _id: string;
  private url: string;
  public there: boolean;
  public loading: boolean;
  public channel: Channel;
  private API_KEY = "AIzaSyDHwyYH0nFYdQEPMi5a5C5WCIspc6ttmGA";

  constructor(private _route: ActivatedRoute, private _tuber: TuberService) { }

  ngOnInit() {

    this.loading= true;

    this._route.paramMap
      .subscribe(
        (params: Params) => {
          this._id = params.get('id');

          this.channel = new Channel();
          this.channel.playlists= [];

          this.get( 0, "" );

          

        }
      )



  }


  get(i: number, pageToken: string) {

    if (i == 0)
      this.url = "https://www.googleapis.com/youtube/v3/playlists?part=snippet,contentDetails&channelId=" + this._id + "&maxResults=7&key=" + this.API_KEY;
    else {
      this.url = "https://www.googleapis.com/youtube/v3/playlists?part=snippet,contentDetails&pageToken="+ pageToken + "&channelId=" + this._id + "&maxResults=7&key=" + this.API_KEY;
    }

    //console.log( pageToken );
    //console.log( this.url );

    if (i != 0 && pageToken == ""){
      this.loading= false;
      
      //console.log( "loading: " + this.loading );
                
      if( this.channel.playlists.length > 0 )
        this.there= true;
      else
        this.there= false;
      
        //console.log( "there: " + this.there );

      return;
    }

    this._tuber.get(this.url)
      .subscribe(
        response => {
          //console.log(response.items);

          if (response.nextPageToken != null) {
            pageToken = response.nextPageToken;
          } else {
            pageToken = "";
          }

          response= response.items;

          for( let i= 0; i< response.length; ++i ){
            let playlist= new Playlist();
            playlist.id= response[i].id;
            playlist.channelId= response[i].snippet.channelId;
            playlist.title= response[i].snippet.title;
            playlist.thumbnail= response[i].snippet.thumbnails.medium.url;
            playlist.itemCount= response[i].contentDetails.itemCount;

            this.channel.playlists.push( playlist );
          } 

          setTimeout( ()=>{

          }, 2500 );

          this.get(i + 1, pageToken);

        }
      )

  }

}
