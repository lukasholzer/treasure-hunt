import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  MESSAGE_TYPES,
  SocketMessage,
  CardType,
} from '@witch-hunter/api-interfaces';
import { Socket } from 'ngx-socket-io';
import { switchMap, tap, map } from 'rxjs/operators';
import { PlayerService } from '../services/player.service';
import * as GameActions from './game.actions';

@Injectable()
export class GameEffects {
  joinGame$ = createEffect(() =>
    this._actions$.pipe(
      ofType(GameActions.joinGame),
      switchMap(() => this._playerService.player$),
      tap(player => {
        this._socket.emit(MESSAGE_TYPES.joinGame, player);
      }),
      map(player => GameActions.joinGameSuccess({ player })),
    ),
  );

  assignCharacter$ = createEffect(() =>
    this._actions$.pipe(
      ofType(GameActions.assignCharacter),
      switchMap(() => {
        this._socket.emit(MESSAGE_TYPES.assignCharacter);
        return this._socket.fromEvent<CardType>(MESSAGE_TYPES.assignCharacter);
      }),
      map(character => GameActions.assignCharacterSuccess({ character })),
    ),
  );

  constructor(
    private _actions$: Actions,
    private _socket: Socket,
    private _playerService: PlayerService,
  ) {}
}
