import { Injectable, Logger } from '@nestjs/common';
import { Player } from '@witch-hunter/api-interfaces';
import { Game } from '../game';
import { createGameStore } from './store';
import { gameReducer } from './reducer';
import { joinGame } from './actions';
import { getPlayers } from './selectors';

@Injectable()
export class GameStoreFacade {
  /** The store where the data flow is managed */
  private _store = createGameStore(gameReducer);

  readonly players$ = this._store.select(getPlayers);

  /** Joins the game with the provided player */
  join(player: Player) {
    this._store.dispatch(joinGame(player));
  }
}
