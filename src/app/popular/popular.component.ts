import { BadRequest } from './../errors/bad-request';
import { AppError } from './../errors/app-error';
import { NotFoundError } from './../errors/not-found-error';
import { LocationService } from './../services/location.service';
import { TuberService } from './../services/tuber.service';
import { Video } from './../video';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'popular-section',
  templateUrl: './popular.component.html',
  styleUrls: ['./popular.component.scss']
})
export class PopularComponent implements OnInit {

  public popVideo: Video[];
  public country: string;
  public countryCode: string;
  public url: string;
  public urlid: string;
  public loading: boolean;
  private API_KEY = "AIzaSyDHwyYH0nFYdQEPMi5a5C5WCIspc6ttmGA";
  public ids: string;

  constructor(private _locator: LocationService, private _tuber: TuberService) {
    this.popVideo = [];
    this.ids = "";
  }

  ngOnInit() {

    this.loading= true;

    //get the location code;
    this._locator.getLocation()
      .subscribe(
      location => {
        this.countryCode = location.country_code;
        this.country = location.country_name;
        //console.log( this.countryCode );

        // get the most popular videos of the country;
        this.url = "https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&regionCode=" + this.countryCode + "&maxResults=21&key=" + this.API_KEY;

        this._tuber.get(this.url)
          .subscribe(
          response => {

            //console.log( response.items );

            for (let i = 0; i < response.items.length; ++i) {
              let video = new Video();
              video.id = response.items[i].id;
              video.title = response.items[i].snippet.title;
              video.description = response.items[i].snippet.description;
              video.channelId = response.items[i].snippet.channelId;
              video.channelTitle = response.items[i].snippet.channelTitle;
              video.thumbnail_url = response.items[i].snippet.thumbnails.medium.url;

              video.title = video.title.trim();
              video.description = video.description.trim();

              if (video.description == "")
                video.description = "*no description*";

              this.popVideo.push(video);

              this.ids += (video.id as string) + ",";
            }

            //console.log( "this " + this.ids );

            // get the stats of the most popular videos
            this.urlid = "https://www.googleapis.com/youtube/v3/videos?part=contentDetails,statistics,snippet&id=" + this.ids + "&key=" + this.API_KEY;
            this._tuber.get(this.urlid)
              .subscribe(
              response => {

                for (let i = 0; i < response.items.length; ++i) {
                  this.popVideo[i].views = response.items[i].statistics.viewCount;
                  this.popVideo[i].duration = response.items[i].contentDetails.duration;
                  this.popVideo[i].publishedAt = response.items[i].snippet.publishedAt;
                }

                this.loading= false;

              }
              )

          }
          )



      },
      error => {
        if (error instanceof NotFoundError)
          throw new NotFoundError(error);
        else if (error instanceof BadRequest)
          throw new BadRequest(error);
        else
          throw new AppError(error);

      }
      )

  }

}
