import { ActivatedRoute, Params } from '@angular/router';
import { TuberService } from './../services/tuber.service';
import { Video } from './../video';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'video-title',
  templateUrl: './video-title.component.html',
  styleUrls: ['./video-title.component.scss']
})
export class VideoTitleComponent implements OnInit {

  public _video: Video;
  private _id: string;
  private _url: string;
  public share: boolean;
  public fbUrl: string;
  public twUrl: string;
  public goUrl: string;
  private API_KEY= "AIzaSyDHwyYH0nFYdQEPMi5a5C5WCIspc6ttmGA";  
  

  constructor( private _tuber: TuberService, private _route: ActivatedRoute ) {
  }

  ngOnInit() {

    this._video= new Video();

    this._route.queryParams
    .subscribe(
      ( params: Params )=> {
        this._id= params['v'];
        this.share= false;
        
        this._url= "https://www.googleapis.com/youtube/v3/videos?part=statistics,snippet&id="+ this._id +"&key=" + this.API_KEY;
        
        this._tuber.get( this._url )
        .subscribe(
          response=> {
            response= response.items[0];

            this._video.id= response.id;
            this._video.publishedAt= response.snippet.publishedAt;
            this._video.channelId= response.snippet.channelId;
            this._video.title= response.snippet.title;
            this._video.description= response.snippet.description;
            this._video.channelTitle= response.snippet.channelTitle;
            this._video.likes= response.statistics.likeCount;
            this._video.dislikes= response.statistics.dislikeCount;
            this._video.views= response.statistics.viewCount;

            this.fbUrl= "https://www.facebook.com/dialog/share?app_id=87741124305&href=https%3A//www.youtube.com/watch%3Fv%3D" + this._video.id + "%26feature%3Dplayer_embedded&display=popup&redirect_uri=https://www.youtube.com/facebook_redirect";
            this.twUrl= "https://twitter.com/intent/tweet?url=https%3A//youtu.be/" + this._video.id + "&text=" + this._video.title + "&via=YouTube&related=YouTube,YouTubeTrends,YTCreators";
            this.goUrl= "https://plus.google.com/share?url=https%3A//www.youtube.com/watch%3Fv%3D" + this._video.id + "%26feature%3Dplayer_embedded&source=yt&hl=en&soc-platform=1&soc-app=130"

            //console.log( this._video );
            this._url= "https://www.googleapis.com/youtube/v3/channels?part=snippet&id="+ this._video.channelId +"&fields=items%2Fsnippet%2Fthumbnails&key=" + this.API_KEY;
            this._tuber.get( this._url )
              .subscribe(
                response=> {
                  response= response.items[0];

                  this._video.channelThumbnailUrl= response.snippet.thumbnails.default.url;

                  //console.log( this.channelThumbnailUrl );
                }
              )
          }
        )
      
      }
    )
  }


}
