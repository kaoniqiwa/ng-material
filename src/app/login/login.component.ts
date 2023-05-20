import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthorizationRequestService } from '../common/service/authorization-request.service';
import { User } from '../network/entity/user.entity';
import { LocalStorageService } from '../common/service/local-storage.service';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute, Router } from '@angular/router';
import { RoutePath } from '../app-routing.path';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
})
export class LoginComponent implements OnInit {
  retUrl: string | null = null;

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
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.queryParamMap.subscribe((params) => {
      this.retUrl = params.get('retUrl');
      console.log(this.retUrl);
      console.log('LoginComponent/ngOnInit ' + this.retUrl);
    });
  }

  ngOnInit(): void {}
  async login() {
    if (this._checkForm()) {
      this.disableLogin = true;
      let username = this.formGroup.value.username!;
      let password = this.formGroup.value.password!;
      try {
        let res = await this._authorizationService.login(username, password);
        if (res instanceof User) {
          if (this.retUrl != null) {
            this._router.navigateByUrl(this.retUrl);
          } else this._router.navigateByUrl(RoutePath.garbage_profiles);
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
