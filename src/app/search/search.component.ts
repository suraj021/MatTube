import { TuberService } from './../services/tuber.service';
import { Video } from './../video';
import { Component, OnInit } from '@angular/core';
import { Title } from "@angular/platform-browser";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  public query:string;
  public url: string;
  public videos: Video[];
  public ids: string;
  public urlid: string;
  public maxResults: number;
  public loading: boolean
  private API_KEY= "AIzaSyDHwyYH0nFYdQEPMi5a5C5WCIspc6ttmGA";

  constructor( private _tuber: TuberService, private titleService: Title ) { 
    this.ids= "";
    this.videos= [];
    this.maxResults= 21;
  }

  ngOnInit() {
    this.titleService.setTitle( "Search | MatTube" );
  }

  onKeyUp( input: HTMLInputElement ){

    this.loading= true;

    if( input.value.trim() == this.query ){
      this.loading= false;
      return ;
    }

    this.query= input.value;

    if( this.query== "" ){
      this.videos= [];
      this.ids= "";
      this.loading= false;
      return;
    }

    //console.log( this.query );

    this.url= "https://www.googleapis.com/youtube/v3/search?part=snippet&q=" + this.query + "&maxResults=" + this.maxResults + "&type=video&key=" + this.API_KEY;
      
    //console.log( this.url );

    this._tuber.get( this.url )
      .subscribe(
        response=> {
            
          //console.log( response.items );

          this.videos= [];
          this.ids= "";

          for( let i= 0; i< response.items.length; ++i ){
            let video= new Video();
            video.id= response.items[i].id.videoId;
            video.title= response.items[i].snippet.title;
            video.description= response.items[i].snippet.description;
            video.thumbnail_url= response.items[i].snippet.thumbnails.medium.url;
            video.publishedAt= response.items[i].snippet.publishedAt;
            video.channelId= response.items[i].snippet.channelId;
            video.channelTitle= response.items[i].snippet.channelTitle;

            this.videos.push( video );

            this.ids+= ( video.id as string ) + ",";
            
          }

          if( this.videos.length > 0 && this.ids!= ""){
            this.urlid= "https://www.googleapis.com/youtube/v3/videos?part=contentDetails,statistics&id="+ this.ids +"&key=" + this.API_KEY;
          
            //console.log( this.urlid );

            this._tuber.get( this.urlid )
              .subscribe(
                response=> {
                                
                  for( let i= 0; i< response.items.length; ++i ){
                    this.videos[i].views= response.items[i].statistics.viewCount; 
                    this.videos[i].likes= response.items[i].statistics.likeCount;
                    this.videos[i].dislikes= response.items[i].statistics.dislikeCount;
                    this.videos[i].duration= response.items[i].contentDetails.duration;
                  }

                  this.loading= false;
                }
              )
          }

        }
      )

  }

}
