import { ActivatedRoute, Params } from '@angular/router';
import { TuberService } from './../services/tuber.service';
import { Video } from './../video';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'recommended-video',
  templateUrl: './recommended.component.html',
  styleUrls: ['./recommended.component.scss']
})
export class RecommendedComponent implements OnInit {

  public videos: Video[];
  private _id: string;
  private _url: string;
  private _ids: string;
  private API_KEY="AIzaSyDHwyYH0nFYdQEPMi5a5C5WCIspc6ttmGA";

  constructor( private _route: ActivatedRoute, private _tuber: TuberService ) { }

  ngOnInit() {

    this.videos= [];
    this._ids= "";

    this._route.queryParams
      .subscribe(
        ( params: Params )=> {
          this._id= params['v'];

          this.videos= [];

          this._url= "https://www.googleapis.com/youtube/v3/search?part=snippet&relatedToVideoId=" + this._id + "&type=video&maxResults=21&key=" + this.API_KEY;
          
                this._tuber.get( this._url )
                  .subscribe(
                    response=>{
                      response= response.items;
          
                      for( let i= 0; i< response.length; ++i ){
                        let video= new Video();
                        video.id= response[i].id.videoId;
                        video.publishedAt= response[i].snippet.publishedAt;
                        video.channelId= response[i].snippet.channelId;
                        video.title= response[i].snippet.title;
                        video.description= response[i].snippet.description;
                        video.thumbnail_url= response[i].snippet.thumbnails.default.url
                        video.channelTitle= response[i].snippet.channelTitle;
          
                        this.videos.push( video );
          
                        this._ids+= video.id + ",";
                      }
          
                      if( this._ids!= ""){
                        this._url= "https://www.googleapis.com/youtube/v3/videos?part=contentDetails,statistics&id="+ this._ids +"&key=" + this.API_KEY;
                      
                        //console.log( this._url );
          
                        this._tuber.get( this._url )
                          .subscribe(
                            response=> {
                                            
                              for( let i= 0; i< response.items.length; ++i ){
                                this.videos[i].views= response.items[i].statistics.viewCount; 
                                this.videos[i].duration= response.items[i].contentDetails.duration;
                       
                              }
          
                              //console.log( this.videos );
                                          
                            }
                          )
                      }
          
                    }
                  )


        }
      )
  }

}
