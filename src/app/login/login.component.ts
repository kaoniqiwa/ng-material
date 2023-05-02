import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthorizationRequestService } from '../network/request/authorization/authorization-request.service';
import { User } from '../network/entity/user.entity';
import { LocalStorageService } from '../common/service/local-storage.service';
import { CookieOptions, CookieService } from 'ngx-cookie-service';
import { Md5 } from 'ts-md5';
import { Router } from '@angular/router';
import { RouterPath } from '../enum/router.enum';
import { encode, decode } from 'js-base64';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
})
export class LoginComponent implements OnInit {
  disableLogin: boolean = false;

  formGroup = this._fb.group({
    username: ['', [Validators.required, Validators.maxLength(15)]],
    password: ['', Validators.required],
  });
  constructor(
    private _router: Router,
    private _fb: FormBuilder,
    private _toastrService: ToastrService,
    private _authorizationService: AuthorizationRequestService,
    private _localStorageService: LocalStorageService,
    private _cookieService: CookieService
  ) {}

  ngOnInit(): void {}
  async login() {
    if (this._checkForm()) {
      this.disableLogin = true;
      let username = this.formGroup.value.username!;
      let password = this.formGroup.value.password!;
      try {
        let res = await this._authorizationService.login(username, password);
        if (res instanceof User) {
          this._router.navigateByUrl(RouterPath.garbage_profiles);
        }
      } catch (e) {
        this._toastrService.error('账号或密码错误');
      } finally {
        this.disableLogin = false;
      }
    }
  }

  private _checkForm() {
    if (this.formGroup.invalid) {
      if (this.formGroup.get('username')!.invalid) {
        this._toastrService.warning('请输入账号');
        return;
      }
      if (this.formGroup.get('password')!.invalid) {
        this._toastrService.warning('请输入密码');
        return;
      }
    }

    return true;
  }
}
