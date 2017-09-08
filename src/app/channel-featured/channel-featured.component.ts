import { Channel } from './../channel';
import { TuberService } from './../services/tuber.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'channel-featured',
  templateUrl: './channel-featured.component.html',
  styleUrls: ['./channel-featured.component.scss']
})
export class ChannelFeaturedComponent implements OnInit {

  private _ids: string;
  private _url: string;
  public loading: boolean;
  public featured: boolean;
  public channel: Channel;
  private API_KEY = "AIzaSyDHwyYH0nFYdQEPMi5a5C5WCIspc6ttmGA";

  constructor(private _route: ActivatedRoute, private _tuber: TuberService) {
  }

  ngOnInit() {

    this.loading = true;
    this.featured= false;

    this._ids = "";
    this.channel = new Channel();

    this._route.paramMap
      .subscribe(
        (params: Params) => {
          this.channel.id = params.get('id');

          this._url = "https://www.googleapis.com/youtube/v3/channels?part=brandingSettings&id=" + this.channel.id + "&key=" + this.API_KEY;

          this._tuber.get(this._url)
            .subscribe(
              response => {

               // console.log(response);

                response = response.items[0].brandingSettings.channel;

                if (response.featuredChannelsTitle != null) {
                  this.channel.featuredChannelsTitle= response.featuredChannelsTitle;
                }

                if( response.featuredChannelsUrls!= null && response.featuredChannelsUrls.length > 0 ){
                  this.featured= true;
                  this.channel.featuredChannels= [];
                  for( let i= 0; i< response.featuredChannelsUrls.length; ++i ){
                    this._ids= response.featuredChannelsUrls[i];
                  }

                  this._url= "https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=" + this._ids + "&key=" + this.API_KEY;

                  this._tuber.get( this._url )
                    .subscribe(
                      response=> {
                        response=  response.items;

                        for( let i= 0; i< response.length; ++i ){

                          let channel= new Channel();
                          channel.id= response[i].id;
                          channel.title= response[i].snippet.title;
                          channel.subscribers= response[i].statistics.subscriberCount;
                          channel.thumbnailUrl= response[i].snippet.thumbnails.medium.url;

                          this.channel.featuredChannels.push( channel );
                          this.loading= false;
                        }

                      }
                    )

                }


                this.loading= false;

              }
            )

          
        }
      )

  }

}
