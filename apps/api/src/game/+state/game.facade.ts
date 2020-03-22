import { Injectable, Logger, Scope } from '@nestjs/common';
import { Player, CardType } from '@witch-hunter/api-interfaces';
import { createGameStore } from './store';
import { gameReducer } from './reducer';
import { joinGame, startGame } from './actions';
import { getPlayers } from './selectors';

const logger = new Logger('GAME 🎲');

@Injectable()
export class GameStoreFacade {
  /** The store where the data flow is managed */
  readonly _store = createGameStore(gameReducer);

  state$ = this._store.select(state$ => state$);

  readonly players$ = this._store.select(getPlayers);

  /** Joins the game with the provided player */
  join(player: Player) {
    this._store.dispatch(joinGame(player));
  }

  assignCharacter(): CardType {
    return 16;
  }

  /** Starts the game */
  start() {
    logger.log('Starting Game 💣');
    this._store.dispatch(startGame());
  }
}
