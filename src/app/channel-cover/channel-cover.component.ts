import { Channel } from './../channel';
import { TuberService } from './../services/tuber.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'channel-cover',
  templateUrl: './channel-cover.component.html',
  styleUrls: ['./channel-cover.component.scss']
})
export class ChannelCoverComponent implements OnInit {

  public _id: string;
  private _url: string;
  public channel: Channel;
  private API_KEY= "AIzaSyDHwyYH0nFYdQEPMi5a5C5WCIspc6ttmGA";

  constructor( private _route: ActivatedRoute, private _tuber: TuberService ) { }

  ngOnInit() {
    this._route.paramMap
    .subscribe(
      ( params : Params)=>{
        this._id= params.get( 'id' );
        
        this._url= "https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics,brandingSettings&id=" + this._id + "&key=" + this.API_KEY;

        this._tuber.get( this._url )
          .subscribe(
            response=> {

              response= response.items[0];

              //console.log( response );

              this.channel= new Channel();

              this.channel.id= response.id;
              this.channel.title= response.snippet.title;
              this.channel.description= response.snippet.description;
              this.channel.customUrl= response.snippet.customUrl;
              this.channel.publishedAt= response.snippet.publishedAt;
              this.channel.thumbnailUrl= response.snippet.thumbnails.medium.url;
              this.channel.country= response.snippet.country;
              this.channel.viewCount= response.statistics.viewCount;
              this.channel.videosCount= response.statistics.videoCount;
              this.channel.subscribers= response.statistics.subscriberCount;
              this.channel.coverUrl= response.brandingSettings.image.bannerImageUrl;
              
            }
          )


      }
    )
  }

}
