import { Injectable } from '@angular/core';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import qs from 'qs';
import { plainToInstance } from 'class-transformer';
import { Md5 } from 'ts-md5';
import { CookieOptions, CookieService } from 'ngx-cookie-service';
import { encode, decode } from 'js-base64';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, catchError, lastValueFrom, of, map } from 'rxjs';
import { AjaxConfig, AjaxError, ajax } from 'rxjs/ajax';

import { UserUrl } from '../../network/url/user.url';
import { DigestResponse } from '../../network/entity/digest-response.entity';
import { User } from '../../network/entity/user.entity';
import { LocalStorageService } from 'src/app/common/service/local-storage.service';
import { SessionStorageService } from 'src/app/common/service/session-storage.service';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpLoginService } from 'src/app/network/request/http/login.service';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationRequestService implements CanActivate {
  // 计数器
  private _nc = 0;

  private _username: string = '';
  private _password: string = '';

  constructor(
    private _http: HttpClient,
    private _router: Router,
    private _localStorage: LocalStorageService,
    private _sessionStorage: SessionStorageService,
    private _cookieService: CookieService,
    private _httpLoginService: HttpLoginService
  ) {
    if (this._cookieService.check('username')) {
      let username = this._cookieService.get('username');
      username = decode(username);
      let res = username.match(
        /[a-zA-Z0-9+/=]{32}(?<username>\w*)[a-zA-Z0-9+/=]{32}/
      )!;

      this._username = res.groups!['username'];
    }

    if (this._cookieService.check('password')) {
      let password = this._cookieService.get('password');
      password = decode(password);
      let res = password.match(
        /[a-zA-Z0-9+/=]{32}(?<password>\w*)[a-zA-Z0-9+/=]{32}/
      )!;

      this._password = res.groups!['password'];
    }
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let challenge = this._sessionStorage.challenge;
    let user = this._localStorage.user;
    let holdCookie = this._cookieService.check('username');
    if (challenge && user && user.Id && holdCookie) {
      return true;
    }

    return this._router.navigateByUrl('/login');
  }
  async login(username: string, password: string) {
    this._username = username;
    this._password = password;

    // return this.loginByAxios();
    // return this.loginByAjax();

    return this.loginByHttpClient();
    return [];
  }

  async loginByAxios() {
    let config: AxiosRequestConfig = {
      url: UserUrl.login(this._username),
      headers: {
        'X-Webbrowser-Authentication': 'Forbidden',
      },
    };

    return axios.request(config).catch((error: AxiosError) => {
      // 第一遍请求服务器返回403并带上认证信息
      if (error.response?.status == 403) {
        let headers = error.response.headers;
        let authenticateHeader = Reflect.get(headers, 'www-authenticate');
        let challenge = this._parseAuthenticateHeader(authenticateHeader);

        config.headers!['Authorization'] = this._generateChallengeHeader(
          challenge,
          'GET',
          UserUrl.login(this._username)
        );

        return axios.request(config).then((res) => {
          let user = plainToInstance(User, res.data);
          this._sessionStorage.challenge = challenge;
          this._localStorage.user = user;

          this._storeUserInfo(this._username, this._password);

          return user;
        });
      }
      return null;
    });
  }

  async loginByAjax() {
    let config: AjaxConfig = {
      url: UserUrl.login(this._username),
      headers: {
        'X-Webbrowser-Authentication': 'Forbidden',
      },
    };
    return lastValueFrom(ajax(config).pipe(catchError(handleError.bind(this))));

    function handleError(this: AuthorizationRequestService, error: AjaxError) {
      if (error.status == 403) {
        let authenticateHeader =
          error.xhr.getResponseHeader('www-authenticate') ?? '';
        let challenge = this._parseAuthenticateHeader(authenticateHeader);
        config.headers = {
          'X-Webbrowser-Authentication': 'Forbidden',
          Authorization: this._generateChallengeHeader(
            challenge,
            'GET',
            UserUrl.login(this._username)
          ),
        };
        this._sessionStorage.challenge = challenge;
      }
      return ajax(config).pipe(
        map((val) => plainToInstance(User, val.response))
      );
    }
  }
  async loginByHttpClient() {
    let res = await lastValueFrom(
      this._httpLoginService.login(this._username, this._password)
    );
    let user = plainToInstance(User, res);

    this._localStorage.user = user;
    this._storeUserInfo(this._username, this._password);

    return user;
  }

  /**
   * Digest realm="howell.net.cn", qop="auth", nonce="b7741dcfe0854ec8adc73a2b59896db1", opaque="37039025b2f4e2f9b2be52150ec951ef", stale="FALSE", algorithm="MD5"
   */
  private _parseAuthenticateHeader(authenticate: string): DigestResponse {
    let fields_str = authenticate
      .replace(/Digest\s/i, '')
      .replace(/\s/g, '')
      .replace(/\"/g, '');
    let plain = qs.parse(fields_str, { delimiter: ',' });
    let challenge = plainToInstance(DigestResponse, plain);
    return challenge;
  }
  private _parseAuthenticateHeader_old(authenticate: string): DigestResponse {
    let fields_str = authenticate.replace(/Digest\s/i, '');
    /**
     *  
     * [
          "realm="howell.net.cn"",
          " qop="auth"",
          " nonce="497bb2bf383743ca8451b8d676dfb269"",
          " opaque="bae228375fd2a0b2eb1fc6f62422b24f"",
          " stale="FALSE"",
          " algorithm="MD5""
        ]
     */
    let fields_arr = fields_str.split(',');

    let challenge = new DigestResponse();

    let len = fields_arr.length;
    // 通过正则提取键值对
    for (let i = 0; i < len; i++) {
      var values = /([a-zA-Z]+)=\"?([a-zA-Z0-9.@\/\s]+)\"?/.exec(fields_arr[i]);
      if (values) challenge[values[1]] = values[2];
    }
    return challenge;
  }

  private _generateChallengeHeader(
    challenge: DigestResponse,
    method: string,
    uri: string
  ) {
    const realm = challenge.realm;
    const nonce = challenge.nonce;

    // 范围:[00000000,ffffffff]
    this._nc++;
    const nc = this._nc.toString(16).padStart(8, '0');

    var cnonce = ('00000000' + Math.random().toString(36).slice(2)).slice(-8);
    const qop = challenge.qop;

    const opaque = challenge.opaque;

    const hash1 = Md5.hashStr(`${this._username}:${realm}:${this._password}`);

    const hash2 = Md5.hashStr(`${method}:${uri}`);
    const response = Md5.hashStr(
      `${hash1}:${nonce}:${nc}:${cnonce}:${qop}:${hash2}`
    );

    const authorization = `Digest username="${this._username}",realm="${realm}",nonce="${nonce}",uri="${uri}",algorithm="MD5",response="${response}",opaque="${opaque}",qop="${qop}",nc="${nc}",cnonce="${cnonce}"`;
    // console.log('authHeaders', authHeaders);
    return authorization;
  }

  /**
   * 保存登录账号
   * @param username
   * @param password
   */
  private _storeUserInfo(username: string, password: string) {
    // 设置cookie 1 小时后过期
    let option: CookieOptions = {
      expires: new Date(Date.now() + 1 * 60 * 60 * 1000),
      path: '/',
      secure: false,
    };
    let prefix = Md5.hashStr(
      ((Math.random() * 1e9) | 0).toString(16).padStart(8, '0')
    );
    let suffix = Md5.hashStr(
      ((Math.random() * 1e9) | 0).toString(16).padStart(8, '0')
    );
    let base64_username = encode(prefix + username + suffix);
    this._cookieService.set('username', base64_username, option);

    prefix = Md5.hashStr(
      ((Math.random() * 1e9) | 0).toString(16).padStart(8, '0')
    );
    suffix = Md5.hashStr(
      ((Math.random() * 1e9) | 0).toString(16).padStart(8, '0')
    );
    let base64_password = encode(prefix + password + suffix);
    this._cookieService.set('password', base64_password, option);
  }

  public generateHttpHeader(method: string, uri: string, contentType?: string) {
    let chanllenge = this._sessionStorage.challenge;

    if (chanllenge) {
      const authHeader = this._generateChallengeHeader(chanllenge, method, uri);
      if (contentType) {
        return new HttpHeaders({
          Authorization: authHeader,
          'X-WebBrowser-Authentication': 'Forbidden',
          'content-type': contentType,
        });
      } else {
        return new HttpHeaders({
          Authorization: authHeader,
          'X-WebBrowser-Authentication': 'Forbidden',
        });
      }
    }
    return void 0;
  }
}
