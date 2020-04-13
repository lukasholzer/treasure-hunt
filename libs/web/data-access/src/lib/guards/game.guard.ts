import { Injectable, Inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, tap, mapTo, switchMap, catchError } from 'rxjs/operators';
import { GameFacade } from '../+state/game/game.facade';
import { HttpClient } from '@angular/common/http';
import { API_ENDPOINT } from '@treasure-hunt/web/shared';
import { LobbyFacade } from '../+state/lobby/lobby.facade';

@Injectable()
export class GameGuard implements CanActivate {
  constructor(
    @Inject(API_ENDPOINT) private _apiEndpoint: string,
    private _httpClient: HttpClient,
    private _lobbyFacade: LobbyFacade,
    private _router: Router,
  ) {}

  canActivate(_next: ActivatedRouteSnapshot, _state: RouterStateSnapshot) {
    return this._lobbyFacade.lobbyName$.pipe(
      switchMap(lobbyName =>
        this._httpClient.get(`${this._apiEndpoint}game/exists/${lobbyName}`),
      ),
      mapTo(true),
      catchError(() => of(this._router.parseUrl('/lobby')))
    );
  }
}
