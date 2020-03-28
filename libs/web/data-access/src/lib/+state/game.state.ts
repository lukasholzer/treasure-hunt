import { Player, CardType } from '@treasure-hunt/shared/interfaces';

export const GAME_FEATURE_KEY = 'game';

export interface State {
  player: Player | null;
  character: CardType | null;
  hand: CardType[];
  lobby: string | null;
  players: Player[];
}

export interface GamePartialState {
  readonly [GAME_FEATURE_KEY]: State;
}

export const initialState = {
  player: null,
  character: null,
  lobby: null,
  hand: [],
  players: [],
};
