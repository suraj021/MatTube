import { Title } from '@angular/platform-browser';
import { Channel } from './../channel';
import { TuberService } from './../services/tuber.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.scss']
})
export class ChannelComponent implements OnInit {

  private _url: string;
  private _id: string;
  public error: boolean;
  public loading: boolean;
  public message: string;
  public channel: Channel;
  private API_KEY= "AIzaSyDHwyYH0nFYdQEPMi5a5C5WCIspc6ttmGA";

  constructor( private _route: ActivatedRoute, private _tuber: TuberService, private titleService: Title ) { 
  }

  ngOnInit() {

    this.loading= true;

    this._route.paramMap
      .subscribe( 
        ( params: Params )=> {
          this._id= params.get( 'id' );

          if( this._id== null ){
            //console.log( "here" );
            this.message= "No Channel Id";
            this.error= true;
          }else{
            this.get();
          }

        }
      )

  }

  get(){
    this._url= "https://www.googleapis.com/youtube/v3/channels?part=snippet&id=" + this._id + "&key=" + this.API_KEY;
    
    //console.log( this._url ) ;

    this._tuber.get( this._url )
      .subscribe(
        response=> {

          if( response.items.length > 0 ){
            response= response.items[0];
            
            this.channel= new Channel();
            this.channel.title= response.snippet.title;
            this.titleService.setTitle( this.channel.title + " | MatTube");
            this.error= false;

          }else{
            this.message= "No Channel found";
            this.error= true;
          }

          this.loading= false;

        }
      )
  }

}
