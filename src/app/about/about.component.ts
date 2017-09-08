import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  public show: boolean;
  public timer: boolean;

  constructor() { }

  ngOnInit() {
    this.show= false;
    this.timer= true;

    setTimeout( ()=> {
      this.timer= false;
    }, 4000 );

  }

  toggle(){
    this.show= !this.show;
  }

}
