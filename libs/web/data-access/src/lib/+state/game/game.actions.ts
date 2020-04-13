import { createAction, props } from '@ngrx/store';
import { CardType, Player } from '@treasure-hunt/shared/interfaces';

/** Used for dispatching a start game action to server */
export const startGame = createAction('[GAME] Start Game');
/** Notification from the server that the game has started */
export const gameStarted = createAction('[GAME] Game has started');
/** Dispatches an action to the server to reveal the character */
export const revealCharacter = createAction('[GAME] Reveal Character');
/** Reveals the assigned character */
export const revealCharacterSuccess = createAction(
  '[GAME] Successfully revealed the character',
  props<{ character: CardType }>(),
);
/** Gets the current hand from the server */
export const handUpdatedSuccess = createAction(
  '[GAME] Successfully updated the current hand',
  props<{ hand: CardType[] }>(),
);

/** Call the current hand to the other players */
export const callHand = createAction(
  '[GAME] Call Hand to the other players',
  props<{ hand: CardType[] }>(),
);


/** Notification from the server that a player called his hand */
export const playerCalled = createAction(
  '[GAME] Player called his hand',
  props<{ player: Player, hand: CardType[] }>(),
);
