import { createAction, props } from '@ngrx/store';
import { Player, CardType } from '@treasure-hunt/api-interfaces';

export const joinGame = createAction('[Game] Join Game');

export const joinGameSuccess = createAction(
  '[Game] Register Player Success',
  props<{ player: Player }>(),
);

export const assignCharacter = createAction(
  '[Game] Draw Character card and assign it.',
);
export const assignCharacterSuccess = createAction(
  '[Game] Got successfully a character Assigned',
  props<{ character: CardType }>(),
);
