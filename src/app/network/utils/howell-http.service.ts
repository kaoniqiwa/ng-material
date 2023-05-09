import { Injectable } from '@angular/core';
import { HttpTypedParams } from './params';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HowellHttpRequestService {
  constructor(private _http: HttpClient) {}
  get<T>(url: string, params: HttpTypedParams = {}) {
    return this._http.get<T>(url, { params });
  }
  post<T>(url: string, body: any | null = null, params: HttpTypedParams = {}) {
    return this._http.post<T>(url, body, { params });
  }
}
