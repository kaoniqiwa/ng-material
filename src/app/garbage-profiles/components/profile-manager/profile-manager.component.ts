import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/garbage-profiles/service/language-service';
import { ProfileManagerConverter } from './profile-manager.converter';
import { ProfileManagerBusiness } from './profile-manager.business';
import {
  ProfileManagerModel,
  ProfileManagerSearchInfo,
  ProfileManagerTextOptions,
} from './profile-manager.model';
import { Page } from 'src/app/network/entity/page.entity';
import { PageEvent } from '@angular/material/paginator';
import { StationProfilePropertyConverter } from '../../converter/station-profile-property.converter';
import { HttpClient } from '@angular/common/http';
import { delay } from 'rxjs';
import { KeyValue } from '@angular/common';

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
    PageSize: 10,
    IdsOrNames: [
      'Number',
      'ProfileName',
      'Province',
      'County',
      'Street',
      'Committee',
      'ProfileState',
      'UpdateTime',
      'GarbageStationName',
      'CommunityName',
      'StrongCurrentWire',
      'StrongCurrentWireMode',
      'StrongCurrentWireLength',
    ],
    enums: [],
    FuzzyQuery: '',
  };
  proxySearchInfo = this.proxyify();

  dataSource: ProfileManagerModel[] = [];
  thWidth: number[] = [];
  tbodyWidth: number[] = [];
  widths: number[] = [];

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
  ) {
    this.thWidth = this.proxySearchInfo.IdsOrNames.map((key, index) => {
      let textWidth = this.getActualWidthOfChars(
        this.language.stationProfileDescription[key],
        {
          size: 24,
        }
      );
      if (index == 0) {
        return textWidth + 24 + 5;
      } else {
        return textWidth + 5 + 5;
      }
    });
    console.log(this.thWidth);
  }

  ngOnInit() {
    this._init();
  }
  private async _init() {
    let config = await this._business.getProfileConfig();

    console.log(config);
    if (config.length) {
      // this.searchInfo.IdsOrNames = config;
    }

    this._getData();
  }

  private async _getData() {
    let { Data, Page } = await this._business.listPartialData(
      this.proxySearchInfo
    );
    this.dataSource = Data;

    for (let i = 0; i < this.proxySearchInfo.IdsOrNames.length; i++) {
      let key = this.proxySearchInfo.IdsOrNames[i];
      for (let j = 0; j < this.dataSource.length; j++) {
        let model = this.dataSource[j];
        let text = model[key];
        let textWidth = this.getActualWidthOfChars(text, { size: 18 });
        if (j == 0) {
          textWidth += 24 + 5;
        } else {
          textWidth += 5 + 5;
        }
        if (this.tbodyWidth[i]) {
          this.tbodyWidth[i] = Math.max(this.tbodyWidth[i], textWidth);
        } else {
          this.tbodyWidth[i] = textWidth;
        }
      }
    }
    console.log(this.tbodyWidth);
    this.widths = this.tbodyWidth.map((w, index) => {
      return Math.max(w, this.thWidth[index]);
    });
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
          return Reflect.get(target, property, receiver);
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
  getActualWidthOfChars(text: string, options: ProfileManagerTextOptions = {}) {
    const { size = 14, family = 'Source Han Sans CN Normal' } = options;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;
    ctx.font = `${size}px ${family}`;
    const metrics = ctx.measureText(text);
    const actual =
      Math.abs(metrics.actualBoundingBoxLeft) +
      Math.abs(metrics.actualBoundingBoxRight);
    return Math.max(metrics.width, actual);
  }
}
