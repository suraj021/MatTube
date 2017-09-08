import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from "rxjs/Observable";
import { BadRequest } from "../errors/bad-request";
import { NotFoundError } from "../errors/not-found-error";
import { AppError } from "../errors/app-error";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';

@Injectable()
export class TuberService {

  constructor( private _http: Http ) { 
  }

  get( url: string ){
    return this._http.get( url )
              .debounceTime( 1000 )
              .map( response=> response.json() )
              .catch( this.handleError );          
  }

  private handleError( error: Response ){
    if( error.status=== 400 )
      return Observable.throw( new BadRequest( error.json() ) );
    
    if( error.status=== 403 )
      return Observable.throw( new AppError( error ) );

    if( error.status=== 404 )
      return Observable.throw( new NotFoundError( error.json() ) );

    return Observable.throw( new AppError( error ) );

  }

}