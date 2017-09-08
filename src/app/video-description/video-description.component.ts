import { TuberService } from './../services/tuber.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Video } from './../video';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'video-description',
  templateUrl: './video-description.component.html',
  styleUrls: ['./video-description.component.scss']
})
export class VideoDescriptionComponent implements OnInit {

  public show: boolean;
  private _id: string;
  private _url: string;
  public video: Video;
  public loading: boolean;
  private API_KEY= "AIzaSyDHwyYH0nFYdQEPMi5a5C5WCIspc6ttmGA";

  constructor( private _route: ActivatedRoute, private _tuber: TuberService ) { }

  ngOnInit() {
    this.show= true;

    this._route.queryParams
    .subscribe(
      ( params: Params )=> {
        this._id= params['v'];

        this.getDescription();

      }
    )
  }

  getDescription(){
    this._url= "https://www.googleapis.com/youtube/v3/videos?part=statistics,snippet&id="+ this._id +"&key=" + this.API_KEY;
    
    this._tuber.get( this._url )
    .subscribe(
      response=> {
        response= response.items[0];

        this.video= new Video();

        this.video.id= response.id;
        this.video.publishedAt= response.snippet.publishedAt;
        this.video.description= response.snippet.description;
        this.video.categoryId= response.snippet.categoryId;

        this._url= "https://www.googleapis.com/youtube/v3/videoCategories?part=snippet&id=" + this.video.categoryId + "&key=" + this.API_KEY;
        
        this._tuber.get( this._url )
          .subscribe( 
            response=> {
              response= response.items[0];

              this.video.category= response.snippet.title;

            }
          )

        //console.log( response );
      }
    )
  }

  showDesc(){
    this.loading= true;

    if( this.video== null ){
      this.getDescription();
    }

    setTimeout( ()=>{
      this.loading= false;
      this.show= true;
    }, 1000 );

  }

  hideDesc(){
    this.show= false;
  }
}
