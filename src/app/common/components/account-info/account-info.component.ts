import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.less']
})
export class AccountInfoComponent implements OnInit {
  title = "生活垃圾档案管理系统"
  desc = "";

  constructor() { }

  ngOnInit(): void {
  }

}
