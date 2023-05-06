import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IAppConfig } from './app-config.interface';
import { tap } from 'rxjs';

@Injectable()
export class AppConfigService {
  static settings: IAppConfig;

  constructor(private _http: HttpClient) {}

  init() {
    const jsonFile = `assets/json/config.json`;

    return this._http.get(jsonFile).pipe(
      tap((response) => {
        AppConfigService.settings = <IAppConfig>response;
      })
    );
  }
}
