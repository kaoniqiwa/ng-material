import { UserConfigType } from '../../enum/user-config-type.enum';
import { BasicUrl } from '../basic.url';

export class UserUrl {
  static basic = `${BasicUrl.user}/Users`;

  static login(username: string): string {
    return `${this.basic}/Login/${username}`;
  }

  static item(id: string) {
    return `${this.basic}/${id}`;
  }
  private static _config: UserConfigUrl;

  static config(id: string) {
    if (!this._config) {
      this._config = new UserConfigUrl(this.item(id));
    }
    return this._config;
  }
}
class UserConfigUrl {
  private _base = '';

  constructor(base: string) {
    this._base = base + '/Config';
  }
  basic() {
    return this._base;
  }
  item(type: UserConfigType) {
    return `${this.basic()}/${type}`;
  }
}
