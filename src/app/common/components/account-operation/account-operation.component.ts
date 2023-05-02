import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { decode } from 'js-base64';
import { SessionStorageService } from '../../service/session-storage.service';
import { LocalStorageService } from '../../service/local-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'account-operation',
  templateUrl: './account-operation.component.html',
  styleUrls: ['./account-operation.component.less'],
})
export class AccountOperationComponent implements OnInit {
  username: string = '';

  constructor(
    private _sessionStorageService: SessionStorageService,
    private _localStorageService: LocalStorageService,
    private _cookieService: CookieService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    let uname = this._cookieService.get('username');
    console.log();
    uname = decode(uname);
    let res = uname.match(
      /[a-zA-Z0-9+/=]{32}(?<username>\w*)[a-zA-Z0-9+/=]{32}/
    )!;

    this.username = res.groups!['username'];
  }

  logoutHandler() {
    this._sessionStorageService.clear();
    this._localStorageService.clear();

    this._cookieService.deleteAll();

    this._router.navigateByUrl('/login');
  }
  navigateToHelp() {
    window.open('http://garbage01.51hws.com/help/help.html');
  }
}
