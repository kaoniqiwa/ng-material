import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'common-time',
  templateUrl: './common-time.component.html',
  styleUrls: ['./common-time.component.less']
})
export class CommonTimeComponent implements OnInit {
  today = new Date();

  ngOnInit(): void {
  }

}
