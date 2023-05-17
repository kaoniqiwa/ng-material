import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { EMPTY, endWith, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ResolverService implements Resolve<any> {
  constructor() {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return EMPTY.pipe(endWith('success'));
  }
}
