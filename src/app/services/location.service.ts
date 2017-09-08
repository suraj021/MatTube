import { NotFoundError } from './../errors/not-found-error';
import { AppError } from './../errors/app-error';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { BadRequest } from "../errors/bad-request";

@Injectable()
export class LocationService {

  private url: string= "https://freegeoip.net/json/"; 

  constructor( private _http: Http ) {}

  getLocation(){
    return this._http.get( this.url )
              .map( response=> response.json() )
              .catch( this.handleError );
  }

  private handleError( error: Response ){
    if( error.status=== 400 )
      return Observable.throw( new BadRequest( error.json() ) );
    
    if( error.status=== 404 )
      return Observable.throw( new NotFoundError( error.json() ) );

    return Observable.throw( new AppError( error ) );

  }

}