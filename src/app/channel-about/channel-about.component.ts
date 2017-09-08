import { Channel } from './../channel';
import { TuberService } from './../services/tuber.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'channel-about',
  templateUrl: './channel-about.component.html',
  styleUrls: ['./channel-about.component.scss']
})
export class ChannelAboutComponent implements OnInit {

  public _id: string;
  public _url: string;
  public channel: Channel;
  public loading: boolean;
  public showSubscribers: boolean;
  private API_KEY= "AIzaSyDHwyYH0nFYdQEPMi5a5C5WCIspc6ttmGA";

  constructor( private _route: ActivatedRoute, private _tuber: TuberService ) {
    this.showSubscribers= false;
  }

  ngOnInit() {

    this.loading= true;

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

                if( this.channel.description== "" )
                  this.channel.description= "N/A";
                if( this.channel.country== null || this.channel.country== "" )
                  this.channel.country= "N/A";


                this.loading= false;
                
              }
            )


        }
      )
  }

  toggle(){
    this.showSubscribers= !this.showSubscribers;
  }

}
