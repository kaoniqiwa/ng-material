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
import { HttpClient } from '@angular/common/http';
import { delay } from 'rxjs';

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

  // 用 proxy 双向绑定
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
  proxyified = this.proxyify();

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
    private _business: ProfileManagerBusiness,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this._init();
    console.log(this.language.stationProfileEnums);
  }
  private async _init() {
    let config = await this._business.getProfileConfig();

    // if (config.length) {
    //   this.searchInfo.IdsOrNames = config;
    // }

    this._getData();
  }

  private async _getData() {
    let { Data, Page } = await this._business.listPartialData(this.proxyified);
    this.dataSource = Data;
    this.page = Page;
    console.log(Data);
  }
  pageEvent(pageInfo: PageEvent) {
    if (this.searchInfo.PageIndex == pageInfo.pageIndex + 1) return;
    this.searchInfo.PageIndex = pageInfo.pageIndex + 1;
    this._init();
  }
  getFruits() {
    // 测试服务器延迟返回
    this.http.get<any[]>('/api/interceptor.php').subscribe(console.log);
  }

  private proxyify() {
    const _this = this;
    let handler = {
      get(target: any, property: string, receiver: any) {
        if (Reflect.has(target, property)) {
          return Reflect.get(target, property);
        } else {
          throw new ReferenceError(`prop name ${property} does not exist `);
        }
      },
      set(target: any, property: any, value: any, receiver: any) {
        if (Reflect.has(target, property)) {
          let descriptor = Reflect.getOwnPropertyDescriptor(target, property)!;
          if (Reflect.has(descriptor, 'writable')) {
            if (
              !Reflect.get(descriptor, 'writable') &&
              !Reflect.get(descriptor, 'configurable')
            ) {
              throw new TypeError('数据属性不可重新赋值');
            }
          } else {
            if (
              !Reflect.get(descriptor, 'set') &&
              !Reflect.get(descriptor, 'configurable')
            ) {
              throw new TypeError('访问器属性不可重新赋值');
            }
          }

          Reflect.set(target, property, value, receiver);
          _this._getData();

          return true;
        } else {
          if (typeof property == 'string') {
            throw new ReferenceError(`prop name ${property} does not exist `);
          } else {
            throw new ReferenceError(
              `prop name ${Symbol.keyFor(property)} does not exist `
            );
          }
        }
      },
    };

    return new Proxy<ProfileManagerSearchInfo>(this.searchInfo, handler);
  }
}
