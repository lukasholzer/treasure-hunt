import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, Effect } from '@ngrx/effects';
import { map, tap } from 'rxjs/operators';
import { SocketService } from '../../services/socket.service';
import { gameFinish, noop } from './game.actions';
import {
  gameStarted,
  cardRevealSuccess,
  SocketMessages,
  getGameStateSuccess,
} from '@treasure-hunt/shared/actions';

@Injectable()
export class GameEffects {
  @Effect()
  gameFinished$ = this._actions$.pipe(
    ofType(getGameStateSuccess),
    map(({ winner }) => {
      if (winner) {
        alert('GAME Ended!');
        return gameFinish({ winner });
      }
      return noop();
    }),
  );

  @Effect({ dispatch: false })
  requestGameState$ = this._actions$.pipe(
    ofType(gameStarted, cardRevealSuccess),
    tap(() => {
      this._socketService.sendMessage(SocketMessages.GetGameState);
      this._socketService.sendMessage(SocketMessages.GetPlayerDetails);
    }),
  );

  constructor(
    private _actions$: Actions,
    private _socketService: SocketService,
  ) {}
}
