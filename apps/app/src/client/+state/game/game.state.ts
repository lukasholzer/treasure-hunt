import { CardType, Player } from '@treasure-hunt/shared/interfaces';
import { EntityState } from '@ngrx/entity';

export const GAME_FEATURE_KEY = 'game';

export interface PlayerEntity extends Player {
  pretendedHand: CardType[];
  revealed: CardType[];
}

export interface State {
  playerId: string | null;
  keyPlayer?: string;
  rounds?: number;
  role?: CardType;
  hand?: CardType[];
  players: EntityState<PlayerEntity>;
  error?: string | null; // last none error (if any)
}

export interface GamePartialState {
  readonly [GAME_FEATURE_KEY]: State;
}
