import { BasicUrl } from "./basic.url";

export class UserUrl {
  static basic = `${BasicUrl.user}/Users`


  static login(username: string): string {
    return `${this.basic}/Login/${username}`;
  }

}