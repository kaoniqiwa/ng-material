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
import { encode, decode } from 'js-base64'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  disableLogin: boolean = false;


  formGroup = this._fb.group({
    username: ['', [Validators.required, Validators.maxLength(15)]],
    password: ['', Validators.required],
  });
  constructor(private _router: Router, private _fb: FormBuilder, private _toastrService: ToastrService, private _authorizationService: AuthorizationRequestService, private _localStorageService: LocalStorageService, private _cookieService: CookieService) { }

  ngOnInit(): void {
  }
  async login() {
    if (this._checkForm()) {
      this.disableLogin = true;
      let username = this.formGroup.value.username!;
      let password = this.formGroup.value.password!
      try {
        let res = await this._authorizationService.loginByAccount(username,
          password);
        if (res instanceof User) {
          this._localStorageService.user = res;
          this._storeUserInfo(username, password)
          this._router.navigateByUrl(RouterPath.garbage_profiles)
        }
      }
      catch (e) {
        this._toastrService.error('账号或密码错误')

      } finally {
        this.disableLogin = false;
      }
    }

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
      path: "/",
      secure: false
    }
    let prefix = Md5.hashStr((Math.random() * 1e9 | 0).toString(16).padStart(8, '0'))
    let suffix = Md5.hashStr((Math.random() * 1e9 | 0).toString(16).padStart(8, '0'))
    let base64_username = encode(prefix + username + suffix);
    this._cookieService.set('username', base64_username, option)


    prefix = Md5.hashStr((Math.random() * 1e9 | 0).toString(16).padStart(8, '0'))
    suffix = Md5.hashStr((Math.random() * 1e9 | 0).toString(16).padStart(8, '0'))
    let base64_password = encode(prefix + password + suffix);
    this._cookieService.set('password', base64_password, option)

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
