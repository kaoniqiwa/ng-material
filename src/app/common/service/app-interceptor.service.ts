import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Observable,
  tap,
  map,
  catchError,
  of,
  EMPTY,
  throwError,
  endWith,
} from 'rxjs';
import { AuthHeaderService } from './auth-header.service';
import { SessionStorageService } from './session-storage.service';

const baseURL = 'https://www.tektutorialsHub.com/';

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {
  constructor(
    private _authHeaderService: AuthHeaderService,
    private _sessionStorage: SessionStorageService
  ) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const notLogin = false;
    // 如果未登录，则取消发送
    if (notLogin) return EMPTY;

    const start = Date.now();

    req = req.clone({
      // 在原先header上添加
      setHeaders: {
        'X-Webbrowser-Authentication': 'Forbidden',
      },
    });
    if (this._sessionStorage.challenge) {
      let challenge = this._sessionStorage.challenge;
      let Authorization = this._authHeaderService.generateAuthorization(
        challenge,
        req.method,
        req.urlWithParams
      );
      req = req.clone({
        setHeaders: {
          Authorization,
        },
      });
    }

    // req = req.clone({
    //   // 在原先header上添加
    //   setHeaders: {
    //     Authorization: this._authHeaderService.generateAuthorization(
    //       challenge,
    //       req.method,
    //       req.url
    //     ),
    //   },
    // });
    // 通过rxjs拦截响应
    return next.handle(req).pipe(
      // tap跟踪请求过程，会执行两次，一次是发送请求，一次是收到响应
      tap((event) => {
        const elapsed = Date.now() - start;
        // console.log(`Request for ${req.urlWithParams} took ${elapsed} ms.`);

        if (event instanceof HttpResponse) {
          // console.log('Response Received');
        }
      }),
      map((res) => {
        return res;
      }),
      catchError(
        (error: HttpEvent<any>, caught: Observable<HttpEvent<any>>) => {
          this._handleError(error);
          throw error;
        }
      )
    );
  }

  private _handleError(error: HttpEvent<any>) {
    if (error instanceof HttpErrorResponse) {
      switch (error.status) {
        case 500:
          console.log('操作失败');
          break;
        case 503:
          console.log('操作失败');
          break;
        case 400:
          console.log('操作失败');
          break;
        case 403:
          console.log('授权失败');
          break;
        case 504:
          console.log('操作失败');
          break;
        default:
      }
    }
  }
}
