export class ProfileManagerModel {
  Id!: string;
  [key: string]: any;
}

export interface ProfileManagerSearchInfo {
  IdsOrNames: string[];
  PageIndex: number;
  PageSize: number;
}
