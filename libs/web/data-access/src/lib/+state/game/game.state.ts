import { CardType } from '@treasure-hunt/shared/interfaces';

export const GAME_FEATURE_KEY = 'game';

export interface State {
  /** If the game has started */
  started: boolean;
  /** The character that the player is assigned to */
  character: CardType | null;
  /** The current hand of the player */
  hand: CardType[];
  /** The current round in the game */
  round: number | null;
  /** The id of the player that is deciding */
  keyPlayer: string | null;
}

export interface GamePartialState {
  readonly [GAME_FEATURE_KEY]: State;
}

export const initialState: State = {
  started: false,
  character: null,
  hand: [],
  round: null,
  keyPlayer: null,
};
