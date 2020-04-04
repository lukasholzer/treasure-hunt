import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { GameFacade } from '../+state/game.facade';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(private _gameFacade: GameFacade, private _router: Router) {}

  canActivate(): Observable<boolean> {
    return this._gameFacade.player$.pipe(
      map(player => Boolean(player)),
      tap(authenticated => {
        if (!authenticated) {
          this._router.navigate(['/lobby/login']);
        }
      }),
    );
  }
}
