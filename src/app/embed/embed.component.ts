import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'embed-video',
  templateUrl: './embed.component.html',
  styleUrls: ['./embed.component.scss']
})
export class EmbedComponent implements OnInit {

  private _id: string;
  public _embedUrl;

  constructor( private _route: ActivatedRoute, private _sanitizer: DomSanitizer ) { }

  ngOnInit() {
    this._route.queryParams
    .subscribe(
      ( params: Params )=> {
        this._id= params['v'];
        this._embedUrl= "https://www.youtube.com/embed/" + this._id + "?autoplay=1"; 
        this._embedUrl= this._sanitizer.bypassSecurityTrustResourceUrl( this._embedUrl );
      }
    )
  }
}
