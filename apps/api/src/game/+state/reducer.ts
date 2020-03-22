import { Logger } from '@nestjs/common';
import { Action, ActionType } from './actions';
import { GameState } from './store';
import { Player } from '@witch-hunter/api-interfaces';

const logger = new Logger('Game Reducer');

/** Type of a reducer */
export type Reducer = (state: GameState, action: Action) => GameState;

/**
 * The Game reducer is the place where we handle all the state updates
 * To have a single entry point. Every action can trigger an update of the state.
 * It has to be a pure function that always returns a new object of the state.
 * @param state The state that should be modified.
 * @param action The current action that should be handled.
 */
export function gameReducer(state: GameState, action: Action): GameState {
  logger.log(`Reducer <${action.type}>`);
  logger.verbose(JSON.stringify(action.payload));

  switch (action.type) {
    case ActionType.JOIN_GAME:
      return { ...state, players: addPlayer(action.payload, state.players) };

    default:
      // Default return the same state as it was passed so don't modify anything
      return state;
  }
}

function addPlayer(player: Player, players: Player[]): Player[] {
  if (players.findIndex(({ email }) => player.email === email) < 0) {
    return [...players, player];
  }
  return players;
}
