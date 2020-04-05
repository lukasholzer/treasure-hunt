import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LobbyActions } from '@treasure-hunt/shared/interfaces';
import { map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { LobbyService } from '../../services';
import {
  joinedLobbySuccess,
  joinLobby,
  leaveLobby,
  leaveLobbySuccess,
  lobbyReconnect,
  login,
  playersUpdated,
} from './lobby.actions';
import { LobbyFacade } from './lobby.facade';

@Injectable()
export class LobbyEffects {
  loginRedirect$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(login),
        tap(() => {
          this._router.navigate(['/lobby']);
        }),
      ),
    { dispatch: false },
  );

  joinLobby$ = createEffect(() =>
    this._actions$.pipe(
      ofType(joinLobby),
      withLatestFrom(this._lobbyFacade.player$),
      switchMap(([{ id }, player]) => {
        this._lobbyService.join(id, player);
        return this._lobbyService.actions$.pipe(
          ofType(LobbyActions.joinedLobby),
          map(({ payload }) => joinedLobbySuccess({ id: payload })),
        );
      }),
    ),
  );

  leaveLobby$ = createEffect(() =>
    this._actions$.pipe(
      ofType(leaveLobby),
      withLatestFrom(this._lobbyFacade.lobbyName$, this._lobbyFacade.player$),
      map(([, name, { id }]) => {
        this._lobbyService.leave(name, id);
        return leaveLobbySuccess();
      }),
    ),
  );

  reconnectLobby$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(lobbyReconnect),
        withLatestFrom(this._lobbyFacade.lobbyName$, this._lobbyFacade.player$),
        tap(([, lobby, player]) => {
          console.log(lobby, player)
          if (lobby && player) {
            this._lobbyService.join(lobby, player);
          }
        }),
      ),
    { dispatch: false },
  );

  playersUpdated$ = createEffect(() =>
    this._lobbyService.actions$.pipe(
      ofType(LobbyActions.playersUpdated),
      map(({ payload }) => playersUpdated({ players: payload })),
    ),
  );

  constructor(
    private _actions$: Actions,
    private _lobbyService: LobbyService,
    private _lobbyFacade: LobbyFacade,
    private _router: Router,
  ) {}
}
