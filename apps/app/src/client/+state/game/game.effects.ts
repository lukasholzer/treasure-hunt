import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, tap } from 'rxjs/operators';
import { SocketService } from '../../services/socket.service';
import { setPlayerId, tellHand } from './game.actions';
import { gameStarted } from '@treasure-hunt/shared/actions';

@Injectable()
export class GameEffects {
  createActions$ = createEffect(() => this._socketService.actions$);

  id$ = createEffect(() =>
    this._socketService.id$.pipe(map(playerId => setPlayerId({ playerId }))),
  );

  tellHand$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(tellHand),
        tap(({ hand }) => {
          this._socketService.sendMessage({
            type: 'tell-hand',
            payload: { hand },
          });
        }),
      ),
    { dispatch: false },
  );

  requestGameState$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(gameStarted),
        tap(() => {
          this._socketService.sendMessage({
            type: 'GameMessageTypes.RequestGameState',
          });
        }),
      ),
    { dispatch: false },
  );

  constructor(
    private _actions$: Actions,
    private _socketService: SocketService,
  ) {}
}
