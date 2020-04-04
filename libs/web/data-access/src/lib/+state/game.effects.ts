import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { GameActions, LobbyActions } from '@treasure-hunt/shared/interfaces';
import { map, switchMap, take, tap, withLatestFrom } from 'rxjs/operators';
import { GameService, LobbyService } from '../services';
import {
  gameStarted,
  joinedLobbySuccess,
  joinLobby,
  leaveLobby,
  leaveLobbySuccess,
  lobbyReconnect,
  login,
  playersUpdated,
  revealCharacter,
  revealCharacterSuccess,
  startGame,
} from './game.actions';
import { GameFacade } from './game.facade';

@Injectable()
export class GameEffects {
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

  joinLobby$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(joinLobby),
        withLatestFrom(this._facade.player$),
        tap(([{ id }, player]) => {
          this._lobbyService.join(id, player);
        }),
      ),
    { dispatch: false },
  );

  leaveLobby$ = createEffect(() =>
    this._actions$.pipe(
      ofType(leaveLobby),
      withLatestFrom(this._facade.lobby$, this._facade.player$),
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
        withLatestFrom(this._facade.lobby$, this._facade.player$),
        tap(([, lobby, player]) => {
          if (lobby && player) {
            this._lobbyService.join(lobby, player);
          }
        }),
      ),
    { dispatch: false },
  );

  startGame$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(startGame),
        withLatestFrom(this._facade.lobby$),
        tap(([, lobby]) => {
          if (lobby) {
            this._lobbyService.startGame(lobby);
          }
        }),
      ),
    { dispatch: false },
  );

  joinedLobby$ = createEffect(() =>
    this._lobbyService.actions$.pipe(
      ofType(LobbyActions.joinedLobby),
      map(({ payload }) => joinedLobbySuccess({ id: payload })),
    ),
  );

  playersUpdated$ = createEffect(() =>
    this._lobbyService.actions$.pipe(
      ofType(LobbyActions.playersUpdated),
      map(({ payload }) => playersUpdated({ players: payload })),
    ),
  );

  // # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
  // #
  // #  GAME
  // #
  // #
  // #
  // # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #

  gameStarted$ = createEffect(() =>
    this._lobbyService.actions$.pipe(
      ofType(LobbyActions.gameStarted),
      tap(() => {
        this._router.navigate(['/game/character']);
      }),
      map(({ payload }) => gameStarted()),
    ),
  );

  revealCharacter$ = createEffect(() =>
    this._actions$.pipe(
      ofType(revealCharacter),
      withLatestFrom(this._facade.lobby$, this._facade.player$),
      switchMap(([, lobby, player]) => {
        this._gameService.revealCharacter(lobby, player);
        return this._gameService.actions$.pipe(
          ofType(GameActions.getCharacterCard),
          take(1),
          map(({ payload }) => revealCharacterSuccess({ character: payload })),
        );
      }),
    ),
  );

  constructor(
    private _actions$: Actions,
    private _lobbyService: LobbyService,
    private _gameService: GameService,
    private _facade: GameFacade,
    private _router: Router,
  ) {}
}
