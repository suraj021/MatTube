import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'channel-data',
  templateUrl: './channel-data.component.html',
  styleUrls: ['./channel-data.component.scss']
})
export class ChannelDataComponent implements OnInit {

  public viewMode: string;

  constructor() { 
    this.viewMode= "about";
  }

  ngOnInit() {
  }

}
