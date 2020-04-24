import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import {
  ApiConfiguration,
  API_CONFIGURATION_TOKEN,
} from '@treasure-hunt/web/shared';
import { of } from 'rxjs';
import { catchError, mapTo, switchMap } from 'rxjs/operators';
import { LobbyFacade } from '../+state/lobby/lobby.facade';

@Injectable()
export class GameGuard implements CanActivate {
  constructor(
    @Inject(API_CONFIGURATION_TOKEN)
    private _apiConfiguration: ApiConfiguration,
    private _httpClient: HttpClient,
    private _lobbyFacade: LobbyFacade,
    private _router: Router,
  ) {}

  canActivate(_next: ActivatedRouteSnapshot, _state: RouterStateSnapshot) {
    return this._lobbyFacade.lobbyName$.pipe(
      switchMap(lobbyName =>
        this._httpClient.get(
          `${this._apiConfiguration.url}game/exists/${lobbyName}`,
        ),
      ),
      mapTo(true),
      catchError(() => of(this._router.parseUrl('/lobby'))),
    );
  }
}
