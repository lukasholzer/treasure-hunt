import { CardType, Player, PlayingPlayer } from '@treasure-hunt/shared/interfaces';
import { EntityState } from '@ngrx/entity';

export const GAME_FEATURE_KEY = 'game';

export interface State {
  winner: CardType | null;
  playerId: string | null;
  keyPlayer?: string;
  roundsLeft?: number;
  role?: CardType;
  revealed?: CardType[];
  hand?: CardType[];
  players: EntityState<PlayingPlayer>;
  error?: string | null; // last none error (if any)
}

export interface GamePartialState {
  readonly [GAME_FEATURE_KEY]: State;
}
