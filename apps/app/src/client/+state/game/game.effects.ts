import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, tap } from 'rxjs/operators';
import { SocketService } from '../../services/socket.service';
import {
  setPlayerId,
  gameFinish,
  noop,
} from './game.actions';
import {
  gameStarted,
  cardRevealSuccess,
  SocketMessages,
  getGameStateSuccess,
} from '@treasure-hunt/shared/actions';

@Injectable()
export class GameEffects {
  createActions$ = createEffect(() => this._socketService.actions$);

  id$ = createEffect(() =>
    this._socketService.id$.pipe(map(playerId => setPlayerId({ playerId }))),
  );

  gameFinished$ = createEffect(() =>
    this._actions$.pipe(
      ofType(getGameStateSuccess),
      map(({ winner }) => {
        if (winner) {
          alert('GAME Ended!')
          return gameFinish({ winner });
        }
        return noop();
      }),
    ),
  );

  requestGameState$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(gameStarted, cardRevealSuccess),
        tap(() => {
          this._socketService.sendMessage(SocketMessages.GetGameState);
          this._socketService.sendMessage(SocketMessages.GetPlayerDetails);
        }),
      ),
    { dispatch: false },
  );

  constructor(
    private _actions$: Actions,
    private _socketService: SocketService,
  ) {}
}
