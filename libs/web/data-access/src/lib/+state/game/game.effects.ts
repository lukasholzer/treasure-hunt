import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { GameActions, LobbyActions } from '@treasure-hunt/shared/interfaces';
import { map, switchMap, take, tap, withLatestFrom } from 'rxjs/operators';
import { GameService, LobbyService } from '../../services';
import {
  gameStarted,
  revealCharacter,
  revealCharacterSuccess,
  startGame,
  handUpdatedSuccess,
} from './game.actions';
import { GameFacade } from './game.facade';
import { LobbyFacade } from '../lobby/lobby.facade';
import { of } from 'rxjs';

@Injectable()
export class GameEffects {
  startGame$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(startGame),
        withLatestFrom(this._lobbyFacade.lobbyName$),
        tap(([, lobby]) => {
          if (lobby) {
            this._lobbyService.startGame(lobby);
          }
        }),
      ),
    { dispatch: false },
  );

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
      withLatestFrom(this._lobbyFacade.lobbyName$, this._lobbyFacade.player$),
      switchMap(([, lobby, player]) => {
        this._gameService.revealCharacter(lobby, player);
        this._gameService.getHand(lobby, player);

        return this._gameService.actions$.pipe(
          ofType(GameActions.getCharacterCard, GameActions.getHand),
          take(1),
          map(({ payload }) => revealCharacterSuccess({ character: payload })),
        );
      }),
    ),
  );

  handUpdated$ = createEffect(() =>
    this._gameService.actions$.pipe(
      ofType(GameActions.getHand),
      map(({ payload }) => handUpdatedSuccess({ hand: payload })),
    ),
  );

  constructor(
    private _actions$: Actions,
    private _lobbyService: LobbyService,
    private _gameService: GameService,
    private _gameFacade: GameFacade,
    private _lobbyFacade: LobbyFacade,
    private _router: Router,
  ) {}
}
