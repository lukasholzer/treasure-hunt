import { Logger } from '@nestjs/common';
import { CardType, Character, Player } from '@treasure-hunt/api-interfaces';
import { generateDeck, getRoleCards, shuffleDeck } from '../config';
import { Action, ActionType } from './actions';
import { GameState, initialState } from './store';

const logger = new Logger('GAME Reducer');

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

  switch (action.type) {
    case ActionType.JOIN_GAME:
      return { ...state, players: addPlayer(action.payload, state.players) };
    case ActionType.START_GAME:
      logger.log('Starting Game 🎲', 'GAME');
      return {
        ...state,
        started: true,
        deck: generateDeck(state.players.length),
      };
    case ActionType.ASSIGN_CHARACTER:
      return {
        ...state,
        players: assignCharacters(state.players, state.deck),
      };
    case ActionType.END_GAME:
      return initialState;
    default:
      // Default return the same state as it was passed so don't modify anything
      return state;
  }
}

function assignCharacters(players: Character[], deck: CardType[]): Character[] {
  const roleCards = shuffleDeck(getRoleCards(deck)).slice(0, players.length);
  return players.map((player, index) => ({
    ...player,
    character: roleCards[index],
  }));
}

function addPlayer(player: Player, players: Character[]): Character[] {
  if (players.findIndex(({ email }) => player.email === email) < 0) {
    return [...players, { ...player, character: null }];
  }
  return players;
}
