import { KeyValue } from '@angular/common';

export class ProfileManagerModel {
  Id!: string;
  [key: string]: any;
}

export interface ProfileManagerSearchInfo {
  IdsOrNames: string[];
  PageIndex: number;
  PageSize: number;
  enums: { [key: string]: any };

  // 模糊查询字段
  FuzzyQuery: string;
}

export interface ProfileManagerTextOptions {
  size?: number;
  family?: string;
}
