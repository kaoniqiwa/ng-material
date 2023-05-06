import { Injectable } from '@angular/core';
import { DigestResponse } from 'src/app/network/entity/digest-response.entity';

@Injectable({
  providedIn: 'root',
})
export class SessionStorageService {
  set challenge(challenge: DigestResponse | null) {
    if (challenge)
      sessionStorage.setItem('smart_challenge', JSON.stringify(challenge));
  }
  get challenge() {
    let challenge_str = sessionStorage.getItem('smart_challenge');

    return challenge_str == null ? null : JSON.parse(challenge_str);
  }
  clear(name?: string) {
    if (name) {
      sessionStorage.removeItem(name);
    } else {
      sessionStorage.clear();
    }
  }
}
