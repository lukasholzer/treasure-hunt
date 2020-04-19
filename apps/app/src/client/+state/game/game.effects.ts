import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, tap } from 'rxjs/operators';
import { SocketService } from '../../services/socket.service';
import {
  setPlayerId,
  tellHand,
  revealCard,
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

  gameFinish$ = createEffect(() =>
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

  revealCard$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(revealCard),
        tap(({ cardIndex, playerId }) => {
          this._socketService.sendMessage(SocketMessages.RevealCard, {
            cardIndex,
            playerId,
          });
        }),
      ),
    { dispatch: false },
  );

  tellHand$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(tellHand),
        tap(({ hand }) => {
          this._socketService.sendMessage(SocketMessages.TellHand, { hand });
        }),
      ),
    { dispatch: false },
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
