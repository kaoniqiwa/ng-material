import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { EMPTY, endWith, of } from 'rxjs';
import { LanguageService } from './language-service';

@Injectable({
  providedIn: 'root',
})
export class LanguageResolverService implements Resolve<any> {
  constructor(private _languageService: LanguageService) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return EMPTY.pipe(endWith('success'));
  }
}
