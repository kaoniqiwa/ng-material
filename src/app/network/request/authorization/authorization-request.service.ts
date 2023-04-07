import { Injectable } from "@angular/core";
import axios, { AxiosError } from 'axios'
import { UserUrl } from "../../url/user.url";
import qs from 'qs';
import { plainToInstance } from 'class-transformer'
import { DigestResponse } from "../../entity/digest-response.entity";

var delimited = qs.parse('a="b",c="d"', { delimiter: ',' });

console.log(delimited)
@Injectable({
  providedIn: "root"
})
export class AuthorizationRequestService {

  login(username: string,
    password: string) {
    this.loginByAccount(username, password)
  }
  loginByAccount(username: string, password: string) {
    axios.request(
      {
        method: 'get',
        url: UserUrl.login(username),
        headers: {
          'X-Webbrowser-Authentication': 'Forbidden',
        }
      }
    ).catch((error: AxiosError) => {
      console.log(error)
      if (error.response?.status == 403) {
        let headers = error.response.headers;
        let authenticateHeader = Reflect.get(headers, 'www-authenticate');
        let challenge = this._parseAuthenticateHeader(authenticateHeader);
        this._parseAuthenticateHeader_old(authenticateHeader);

      }
    })
  }
  private _parseAuthenticateHeader(authenticate: string): any {
    let fields_str = authenticate.replace(/Digest\s/i, '').replace(/\s/g, '').replace(/\"/g, '');
    let plain = qs.parse(fields_str, { delimiter: ',' })
    let challenge = plainToInstance(DigestResponse, plain)
    return challenge;
  }
  private _parseAuthenticateHeader_old(authenticate: string): DigestResponse {
    let fields_str = authenticate.replace(/Digest\s/i, '');
    let fields_arr = fields_str.split(',');

    let challenge = new DigestResponse();

    let len = fields_arr.length;
    for (let i = 0; i < len; i++) {
      var values = /([a-zA-Z]+)=\"?([a-zA-Z0-9.@\/\s]+)\"?/.exec(fields_arr[i]);
      if (values) challenge[values[1]] = values[2];
    }
    console.log(challenge);
    return challenge;
  }

}