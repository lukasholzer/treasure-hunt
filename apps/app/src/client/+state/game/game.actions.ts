import { createAction, props } from '@ngrx/store';
import { CardType } from '@treasure-hunt/shared/interfaces';

export const setPlayerId = createAction(
  '[GAME] Set Players Socket Id',
  props<{ playerId: string }>(),
);

export const gameFinish = createAction(
  '[GAME] The game has ended!',
  props<{ winner: CardType }>(),
);

export const noop = createAction('noop');
