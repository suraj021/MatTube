import { Title } from '@angular/platform-browser';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {

  @Input() message: string;

  constructor( private title: Title ) { 
    this.message= "Error 404";
  }

  ngOnInit() {
    this.title.setTitle( "Error 404 | MatTube" );
  }

}
