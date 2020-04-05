import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { LobbyFacade } from '../+state/lobby/lobby.facade';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(private _lobbyFacade: LobbyFacade, private _router: Router) {}

  canActivate(): Observable<boolean> {
    return this._lobbyFacade.player$.pipe(
      map(player => Boolean(player)),
      tap(authenticated => {
        if (!authenticated) {
          this._router.navigate(['/lobby/login']);
        }
      }),
    );
  }
}
