import { Injectable } from "@angular/core";
import { User } from "src/app/network/entity/user.entity";

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  set user(user: User) {
    localStorage.setItem('user', JSON.stringify(user))
  }
  get user() {
    /**
     *  JSON.parse()
     */
    let user = localStorage.getItem('user');

    return user === null ? null : JSON.parse(user);
  }
}

