import { Injectable } from '@angular/core';
import {
  BaseRequestService,
  BaseTypeRequestService,
} from '../../utils/base-http.service';
import { User } from '../../entity/user.entity';
import { UserUrl } from '../../url/user-system/user.url';
import { UserConfigType } from '../../enum/user-config-type.enum';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _typeRequest: BaseTypeRequestService<User>;
  constructor(private _baseRequest: BaseRequestService) {
    this._typeRequest = this._baseRequest.type<User>(User);
  }

  get(id: string) {
    let url = UserUrl.item(id);

    return this._typeRequest.get(url);
  }

  private _config?: UserConfigService;
  get config() {
    if (!this._config) {
      this._config = new UserConfigService(this._baseRequest);
    }
    return this._config;
  }
}

class UserConfigService {
  _typeRequest: BaseTypeRequestService<string[]>;

  constructor(private _baseRequest: BaseRequestService) {
    this._typeRequest = this._baseRequest.type(Array<string>);
  }
  get(userId: string, type: UserConfigType) {
    let url = UserUrl.config(userId).item(type);
    return this._typeRequest.get(url);
  }
}
