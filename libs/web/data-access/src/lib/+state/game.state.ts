import { Player, CardType } from '@treasure-hunt/api-interfaces';

export const GAME_FEATURE_KEY = 'game';

export interface State {
  player: Player | null;
  character: CardType | null;
  hand: CardType[];
}

export interface GamePartialState {
  readonly [GAME_FEATURE_KEY]: State;
}

export const initialState = {
  player: null,
  character: null,
  hand: [],
};
