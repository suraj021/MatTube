import { Title } from '@angular/platform-browser';
import { TuberService } from './../services/tuber.service';
import { Video } from './../video';
import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'watch',
  templateUrl: './watch.component.html',
  styleUrls: ['./watch.component.scss']
})
export class WatchComponent implements OnInit, AfterViewInit {

  private _id: string;
  private _url: string;
  public video: Video;
  public error: boolean;
  public message: string;
  private API_KEY = "AIzaSyDHwyYH0nFYdQEPMi5a5C5WCIspc6ttmGA";

  constructor(private _route: ActivatedRoute, private _tuber: TuberService, private titleService: Title ) {
    this.error = false;
    this.message = "No video";
  }

  ngOnInit() {
    this._route.queryParams
      .subscribe(
        (params: Params) => {
          this._id = params['v'];

          if( this._id== null ){
            this.error= true;
            return;
          }else{

            this.get();
          }

        }
      )
  }

  ngAfterViewInit() {

  }

  get() {
    this._url = "https://www.googleapis.com/youtube/v3/videos?part=snippet&id=" + this._id + "&key=" + this.API_KEY;

    this._tuber.get(this._url)
      .subscribe(
      response => {

        //console.log(response);

        // Wrong Youtube Id;
        if (response.items.length == 0) {
          this.error = true;
        } else {
          response = response.items[0];

          this.video = new Video();

          this.video.title = response.snippet.title;

          this.titleService.setTitle(this.video.title + " | MatTube");
        }
      }
      )
  }

}
