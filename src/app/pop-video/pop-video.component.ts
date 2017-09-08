import { Video } from './../video';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'pop-video',
  templateUrl: './pop-video.component.html',
  styleUrls: ['./pop-video.component.scss']
})
export class PopVideoComponent implements OnInit {

  @Input() video: Video;

  constructor() {}

  ngOnInit() {
  }

}
