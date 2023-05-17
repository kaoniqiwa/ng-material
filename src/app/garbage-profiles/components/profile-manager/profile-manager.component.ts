import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/garbage-profiles/service/language-service';
import { ProfileManagerConverter } from './profile-manager.converter';
import { ProfileManagerBusiness } from './profile-manager.business';
import {
  ProfileManagerModel,
  ProfileManagerSearchInfo,
} from './profile-manager.model';
import { Page } from 'src/app/network/entity/page.entity';
import { PageEvent } from '@angular/material/paginator';
import { StationProfilePropertyConverter } from '../../converter/station-profile-property.converter';

@Component({
  selector: 'profile-manager',
  templateUrl: './profile-manager.component.html',
  styleUrls: ['./profile-manager.component.less'],
  providers: [
    ProfileManagerBusiness,
    ProfileManagerConverter,
    StationProfilePropertyConverter,
  ],
})
export class ProfileManagerComponent implements OnInit {
  title = '档案管理';

  searchInfo: ProfileManagerSearchInfo = {
    PageIndex: 1,
    PageSize: 1,
    IdsOrNames: [
      'ProfileName',
      'Province',
      'County',
      'Street',
      'Committee',
      'ProfileState',
      'UpdateTime',
    ],
  };

  dataSource: ProfileManagerModel[] = [];

  page: Page = {
    PageIndex: 0,
    PageSize: 0,
    RecordCount: 0,
    TotalRecordCount: 0,
    PageCount: 0,
  };

  constructor(
    public language: LanguageService,
    private _business: ProfileManagerBusiness
  ) {
    console.log(this.language);
  }

  ngOnInit(): void {
    this._init();
  }
  private async _init() {
    let config = await this._business.getProfileConfig();
    // if (config.length) {
    //   this.searchInfo.IdsOrNames = config;
    // }
    let { Data, Page } = await this._business.listPartialData(this.searchInfo);
    this.dataSource = Data;
    this.page = Page;

    console.log(this.dataSource);
  }

  pageEvent(pageInfo: PageEvent) {
    if (this.searchInfo.PageIndex == pageInfo.pageIndex + 1) return;
    this.searchInfo.PageIndex = pageInfo.pageIndex + 1;
    this._init();
  }
}
