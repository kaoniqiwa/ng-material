import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserUrl } from '../../url/user.url';
import { catchError, lastValueFrom, of } from 'rxjs';
import { AuthHeaderService } from 'src/app/common/service/auth-header.service';
import { SessionStorageService } from 'src/app/common/service/session-storage.service';

@Injectable({
  providedIn: 'root',
})
export class HttpLoginService {
  constructor(
    private _http: HttpClient,
    private _authHeaderService: AuthHeaderService,
    private _sessionStorage: SessionStorageService
  ) {}

  login(username: string, password: string) {
    this._authHeaderService.username = username;
    this._authHeaderService.password = password;

    return this._http
      .get(UserUrl.login(username))
      .pipe(catchError((error) => this.handleError(error)));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status == 403) {
      let authenticateHeader = error.headers.get('www-authenticate') ?? '';
      let challenge =
        this._authHeaderService.parseAuthenticateHeader(authenticateHeader);

      this._sessionStorage.challenge = challenge;
    }
    return this._http.get(UserUrl.login(this._authHeaderService.username));
  }
}
