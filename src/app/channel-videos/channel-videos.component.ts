import { Channel } from './../channel';
import { TuberService } from './../services/tuber.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Video } from "../video";

@Component({
  selector: 'channel-videos',
  templateUrl: './channel-videos.component.html',
  styleUrls: ['./channel-videos.component.scss']
})
export class ChannelVideosComponent implements OnInit {

  private _ids: string;
  private _url: string;
  public loading: boolean;
  public uploaded: boolean;
  public channel: Channel;
  private API_KEY= "AIzaSyDHwyYH0nFYdQEPMi5a5C5WCIspc6ttmGA";

  constructor( private _route: ActivatedRoute, private _tuber: TuberService) { }

  ngOnInit() {

    this._ids= "";
    this.loading= true;
    this.channel= new Channel();

    this._route.paramMap
      .subscribe(
        ( params : Params)=>{
          this.channel.id= params.get( 'id' );

          this._url= "https://www.googleapis.com/youtube/v3/search?order=date&type=video&part=snippet&channelId=" + this.channel.id + "&maxResults=21&key=" + this.API_KEY;

          //console.log( this._url );

          this._tuber.get( this._url )
            .subscribe(
              response=> {
                response= response.items;

                if( response.length > 0 ){
                  this.uploaded= true;
                  this.channel.uploads= [];

                  //console.log( response );

                  for( let i= 0; i< response.length; ++i ){
                    let video= new Video();

                    video.id= response[i].id.videoId;
                    video.title= response[i].snippet.title;
                    this._ids+= video.id + ",";

                    this.channel.uploads.push( video );
                  }

                  if( this._ids!= ""){
                    this._url= "https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics,contentDetails&id="+ this._ids +"&key=" + this.API_KEY;

                   //console.log( this._url );

                    this._tuber.get( this._url )
                      .subscribe(
                        response=> {
                          response=response.items;

                         //console.log( response );

                          for( let i= 0; i< response.length; ++i ){
                            this.channel.uploads[i].thumbnail_url= response[i].snippet.thumbnails.medium.url;
                            this.channel.uploads[i].views= response[i].statistics.viewCount;
                            this.channel.uploads[i].publishedAt= response[i].snippet.publishedAt;
                            this.channel.uploads[i].duration= response[i].contentDetails.duration;
                          }

                        }
                      )
                  }

                  this.loading= false;

                }

                this.loading= false;

              }
            )

        }
      )
  }

}
