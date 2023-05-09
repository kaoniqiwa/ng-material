import { Route } from '@angular/router';
import { PreloadingStrategy } from '@angular/router';
import { Observable, of, delay, flatMap } from 'rxjs';

export class CustomPreloadingStrategy implements PreloadingStrategy {
  preload(route: Route, fn: () => Observable<boolean>): Observable<boolean> {
    return of(true).pipe(
      delay(5000),
      flatMap((_: boolean) => fn())
    );
  }
}
