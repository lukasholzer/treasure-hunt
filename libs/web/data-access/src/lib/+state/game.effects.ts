import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  MESSAGE_TYPES,
  SocketMessage,
  CardType,
} from '@treasure-hunt/api-interfaces';
import { Socket } from 'ngx-socket-io';
import { switchMap, tap, map, withLatestFrom, pluck } from 'rxjs/operators';
import * as GameActions from './game.actions';
import { GameFacade } from './game.facade';

@Injectable()
export class GameEffects {
  loginRedirect$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(GameActions.login),
        tap(() => {
          this._router.navigate(['/lobby']);
        }),
      ),
    { dispatch: false },
  );

  // joinGame$ = createEffect(() =>
  //   this._actions$.pipe(
  //     ofType(GameActions.joinGame),
  //     withLatestFrom(this._facade.player$),
  //     tap(player => {
  //       this._socket.emit(MESSAGE_TYPES.joinGame, player);
  //     }),
  //     map(player => GameActions.joinGameSuccess({ player })),
  //   ),
  // );

  // assignCharacter$ = createEffect(() =>
  //   this._actions$.pipe(
  //     ofType(GameActions.assignCharacter),
  //     withLatestFrom(this._facade.player$),
  //     switchMap(([, player]) => {
  //       this._socket.emit(MESSAGE_TYPES.assignCharacter, player);
  //       return this._socket.fromEvent<CardType>(MESSAGE_TYPES.assignCharacter);
  //     }),
  //     map(character => GameActions.assignCharacterSuccess({ character })),
  //   ),
  // );

  constructor(
    private _actions$: Actions,
    private _socket: Socket,
    private _facade: GameFacade,
    private _router: Router,
  ) {}
}
