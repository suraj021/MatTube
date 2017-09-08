import { Video } from './../video';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'result-row',
  templateUrl: './result-row.component.html',
  styleUrls: ['./result-row.component.scss']
})
export class ResultRowComponent implements OnInit {

  @Input() video: Video;

  constructor() {}

  ngOnInit() {
  }

}
