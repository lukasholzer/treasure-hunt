import { Injectable, Logger, Scope } from '@nestjs/common';
import { Player, CardType } from '@treasure-hunt/api-interfaces';
import { createGameStore } from './store';
import { gameReducer } from './reducer';
import * as Actions from './actions';
import { getPlayers, hasGameStarted, getCharacter } from './selectors';
import { Observable } from 'rxjs';

@Injectable()
export class GameStoreFacade {
  /** The store where the data flow is managed */
  readonly _store = createGameStore(gameReducer);

  state$ = this._store.select(state$ => state$);

  started$ = this._store.select(hasGameStarted);

  readonly players$ = this._store.select(getPlayers);

  character$ = (player): Observable<CardType> =>
    this._store.select(state$ => getCharacter(state$, player));

  /** Joins the game with the provided player */
  join(player: Player): void {
    this._store.dispatch(Actions.joinGame(player));
  }

  /** Starts the game round */
  startGame(): void {
    this._store.dispatch(Actions.startGame());
  }

  /** Ends the game */
  endGame(): void {
    this._store.dispatch(Actions.endGame());
  }

  assignCharacter(player: Player): void {
    this._store.dispatch(Actions.assignCharacter(player));
  }
}
