import { NotFoundError } from './../errors/not-found-error';
import { BadRequest } from './../errors/bad-request';
import { AppError } from './../errors/app-error';
import { Video } from './../video';
import { Comment } from './../comment';
import { TuberService } from './../services/tuber.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {

  public show: boolean;
  private _id: string;
  private _url: string;
  public comments: Comment[];
  public video: Video;
  public loading: boolean;
  public error: boolean;
  public errorMessage: string;
  private API_KEY = "AIzaSyDHwyYH0nFYdQEPMi5a5C5WCIspc6ttmGA";

  constructor(private _route: ActivatedRoute, private _tuber: TuberService) {
  }

  ngOnInit() {

    this._route.queryParams
      .subscribe(
        (params: Params) => {
          this._id = params['v'];
          this.show = false;
          this.error = false;
        }
      )
  }

  showComments() {
    this.comments = [];

    this.show = true;
    this.loading = true;

    this._url = "https://www.googleapis.com/youtube/v3/commentThreads?videoId=" + this._id + "&part=snippet,replies&maxResults=21&key=" + this.API_KEY;

    //console.log(this._url);

    this._tuber.get(this._url)
      .subscribe(
      response => {

        this.error= false;
        this.errorMessage= "";

        response = response.items;

        for (let i = 0; i < response.length; ++i) {
          let comment = new Comment();
          comment.author = response[i].snippet.topLevelComment.snippet.authorDisplayName;
          comment.authorChannelId = response[i].snippet.topLevelComment.snippet.authorChannelId.value;
          comment.authorProfileImageUrl = response[i].snippet.topLevelComment.snippet.authorProfileImageUrl;
          comment.likeCount = response[i].snippet.topLevelComment.snippet.likeCount;
          comment.publishedAt = response[i].snippet.topLevelComment.snippet.publishedAt;
          comment.textDisplay = response[i].snippet.topLevelComment.snippet.textDisplay;
          comment.replyCount = response[i].snippet.totalReplyCount;

          if (comment.replyCount > 0) {
            comment.replies = [];
          }

          for (let j = 0; j < comment.replyCount % 7; ++j) {
            let reply = new Comment();
            reply.author = response[i].replies.comments[j].snippet.authorDisplayName;
            reply.authorProfileImageUrl = response[i].replies.comments[j].snippet.authorProfileImageUrl;
            reply.authorChannelId = response[i].replies.comments[j].snippet.authorChannelId.value;
            reply.textDisplay = response[i].replies.comments[j].snippet.textOriginal;
            reply.likeCount = response[i].replies.comments[j].snippet.likeCount;
            reply.publishedAt = response[i].replies.comments[j].snippet.publishedAt;

            comment.replies.push(reply);
          }

          this.comments.push(comment);
        }
        this.loading = false;
        //console.log(this.comments);

      },
      error => {

        this.error = true;
        this.loading= false;

        if (error instanceof BadRequest)
          this.errorMessage = "Bad Request. User message: \"Sorry, the items were successfully shared but emails could not be sent to email@domain.com.";
        else if (error instanceof AppError)
          this.errorMessage = "This video has disabled comments";
        else if (error instanceof NotFoundError)
          this.errorMessage = "Not Found Error";
        else
          this.errorMessage = "Some error occurred";

      }
      )
  }

  hideComments() {
    this.show = false;
    this.loading = false;
  }

}
