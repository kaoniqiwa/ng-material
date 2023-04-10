import { Injectable } from "@angular/core";
import axios, { AxiosError, AxiosRequestConfig } from 'axios'
import qs from 'qs';
import { plainToInstance } from 'class-transformer'
import { Md5 } from 'ts-md5'

import { UserUrl } from "../../url/user.url";
import { DigestResponse } from "../../entity/digest-response.entity";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { User } from "../../entity/user.entity";

@Injectable({
  providedIn: "root"
})
export class AuthorizationRequestService implements CanActivate {
  // 计数器
  private _nc = 0;
  private _config: AxiosRequestConfig = {};

  private _username: string = "";
  private _password: string = "";


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return true;
  }
  login(username: string,
    password: string) {
    this.loginByAccount(username, password)
  }
  loginByAccount(username: string, password: string) {
    this._username = username;
    this._password = password;
    this._config.url = UserUrl.login(username);
    this._config.headers = {
      'X-Webbrowser-Authentication': 'Forbidden',
    }

    axios.request(
      this._config
    ).catch((error: AxiosError) => {
      if (error.response?.status == 403) {
        let headers = error.response.headers;
        let authenticateHeader = Reflect.get(headers, 'www-authenticate');
        let challenge = this._parseAuthenticateHeader(authenticateHeader);

        this._config.headers!['Authorization'] = this._generateChallengeHeader(
          challenge,
          'GET',
          UserUrl.login(username)
        );

        axios.request(
          this._config
        ).then(res => {
          let user = plainToInstance(User, res.data)
          console.log(user)
        })
      }
    })
  }
  /**
   * Digest realm="howell.net.cn", qop="auth", nonce="b7741dcfe0854ec8adc73a2b59896db1", opaque="37039025b2f4e2f9b2be52150ec951ef", stale="FALSE", algorithm="MD5"
 */
  private _parseAuthenticateHeader(authenticate: string): DigestResponse {
    let fields_str = authenticate.replace(/Digest\s/i, '').replace(/\s/g, '').replace(/\"/g, '');
    let plain = qs.parse(fields_str, { delimiter: ',' })
    let challenge = plainToInstance(DigestResponse, plain)
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

}