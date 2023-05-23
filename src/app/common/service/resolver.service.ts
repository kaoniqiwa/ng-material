import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { EMPTY, endWith, of } from 'rxjs';
import { LanguageService } from 'src/app/garbage-profiles/service/language-service';

@Injectable({
  providedIn: 'root',
})
export class ResolverService implements Resolve<any> {
  constructor(private language: LanguageService) {}
  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    await this.language.listStationProfileProperties();
    return EMPTY.pipe(endWith('success'));
  }
}
