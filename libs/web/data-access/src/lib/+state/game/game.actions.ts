import { createAction, props } from '@ngrx/store';
import { CardType } from '@treasure-hunt/shared/interfaces';

export const startGame = createAction('[GAME] Start Game');
export const gameStarted = createAction('[GAME] Game has started');

export const revealCharacter = createAction('[GAME] Reveal Character');
export const revealCharacterSuccess = createAction(
  '[GAME] Successfully revealed the character',
  props<{ character: CardType }>(),
);
