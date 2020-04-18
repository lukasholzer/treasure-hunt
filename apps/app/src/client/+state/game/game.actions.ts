import { createAction, props } from '@ngrx/store';
import { CardType } from '@treasure-hunt/shared/interfaces';

export const setPlayerId = createAction(
  '[GAME] Set Players Socket Id',
  props<{ playerId: string }>(),
);

export const tellHand = createAction(
  '[GAME] Tell my hand',
  props<{ hand: CardType[] }>(),
);
