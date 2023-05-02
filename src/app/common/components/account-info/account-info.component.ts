import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.less']
})
export class AccountInfoComponent implements OnInit {
  title = "生活垃圾档案管理系统"
  desc = "";

  constructor(private _title: Title) {
    this._title.setTitle(this.title)
  }

  ngOnInit(): void {
  }

}
