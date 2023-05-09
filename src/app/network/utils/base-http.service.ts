import { Injectable, Type } from '@angular/core';
import { HowellHttpRequestService } from './howell-http.service';
import { HttpTypedParams } from './params';
import { lastValueFrom } from 'rxjs';
import { ConvertResponseService } from './convert-response';
import { PagedList } from '../entity/page.entity';

@Injectable({
  providedIn: 'root',
})
export class BaseRequestService {
  constructor(
    private _howellHttpRequest: HowellHttpRequestService,
    private _convertResponse: ConvertResponseService
  ) {}

  async get<T>(
    url: string,
    type: Type<any> = Object,
    query: HttpTypedParams = {}
  ) {
    let response = await lastValueFrom(
      this._howellHttpRequest.get<T>(url, query)
    );
    return this._convertResponse.convert<T>(response, type);
  }

  async post<T>(
    url: string,
    type: Type<any> = Object,
    body: any | null = null,
    query: HttpTypedParams = {}
  ) {
    let response = await lastValueFrom(
      this._howellHttpRequest.post<T>(url, body, query)
    );
    return this._convertResponse.convert(response, type);
  }
  async paged<T>(
    url: string,
    type: Type<any> = Object,
    body: any | null = null,
    query: HttpTypedParams = {}
  ) {
    let response = await lastValueFrom(
      this._howellHttpRequest.post<PagedList<T>>(url, body, query)
    );
    return this._convertResponse.convert(response, type) as PagedList<T>;
  }

  type<T>(type: Type<any>) {
    return new BaseTypeRequestService<T>(this, type);
  }
}
export class BaseTypeRequestService<T> {
  constructor(private _base: BaseRequestService, private _type: Type<any>) {}

  get(url: string, params: HttpTypedParams = {}) {
    return this._base.get<T>(url, this._type, params);
  }
  post(url: string, body: any | null = null, params: HttpTypedParams = {}) {
    return this._base.post(url, this._type, body, params);
  }
  paged(url: string, body: any | null = null, params: HttpTypedParams = {}) {
    return this._base.paged<T>(url, this._type, body, params);
  }
}
