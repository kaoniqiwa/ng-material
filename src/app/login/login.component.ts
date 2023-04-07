import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthorizationRequestService } from '../network/request/authorization/authorization-request.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  disableLogin: boolean = false;


  formGroup = this.fb.group({
    username: ['1', [Validators.required, Validators.maxLength(15)]],
    password: ['2', Validators.required],
    storepass: false,
    autologin: false,
  });
  constructor(private fb: FormBuilder, private toastrService: ToastrService, private authorizationService: AuthorizationRequestService) { }

  ngOnInit(): void {
  }
  login() {
    if (this._checkForm()) {
      // this.disableLogin = true;

      this.authorizationService.login(this.formGroup.value.username!,
        this.formGroup.value.password!)
    }

  }
  private _checkForm() {
    if (this.formGroup.invalid) {
      if (this.formGroup.get('username')!.invalid) {
        this.toastrService.warning('请输入账号');
        return;
      }
      if (this.formGroup.get('password')!.invalid) {
        this.toastrService.warning('请输入密码');
        return;
      }
    }

    return true;
  }

}
