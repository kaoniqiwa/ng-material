import { INJECTOR, Inject, Injectable, Injector } from '@angular/core';
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
  language: LanguageService;
  constructor(@Inject(INJECTOR) injector: Injector) {
    this.language = injector.get(LanguageService);
  }
  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    await this.language.listStationProfileProperties();
    return EMPTY.pipe(endWith('success'));
  }
}
