import { Player, CardType } from '@treasure-hunt/shared/interfaces';

export const GAME_FEATURE_KEY = 'game';

export interface State {
  /** If the game has started */
  started: boolean;
  player: Player | null;
  character: CardType | null;
  hand: CardType[];
  /** The id of the lobby */
  lobby: string | null;
  /** The list of all players in the lobby */
  players: Player[];
}

export interface GamePartialState {
  readonly [GAME_FEATURE_KEY]: State;
}

export const initialState = {
  started: false,
  player: null,
  character: null,
  lobby: null,
  hand: [],
  players: [],
};
