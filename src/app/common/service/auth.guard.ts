import {
  CanActivate,
  CanActivateChild,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Injectable } from '@angular/core';
import { SessionStorageService } from './session-storage.service';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(
    private _sessionStorage: SessionStorageService,
    private _localStorage: LocalStorageService,
    private _cookieService: CookieService,
    private _router: Router
  ) {}
  private isLogin() {
    let challenge = this._sessionStorage.challenge;
    let user = this._localStorage.user;
    if (challenge && user && user.Id) {
      return true;
    }
    return false;
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!this.isLogin()) {
      this._router.navigate(['login'], {
        queryParams: { retUrl: state.url },
      });
    }
    return true;
  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    if (!this.isLogin()) {
      this._router.navigate(['login'], {
        queryParams: { retUrl: state.url },
      });
    }
    return true;
  }
}
