import { createAction, props } from '@ngrx/store';
import { Player, CardType } from '@treasure-hunt/shared/interfaces';

/** Joins the lobby with a username and a player profile */
export const login = createAction(
  '[LOGIN] Login into the game',
  props<{ name: string; image: string }>(),
);

export const joinLobby = createAction(
  '[LOBBY] Join Lobby',
  props<{ id: string }>(),
);

export const joinedLobbySuccess = createAction(
  '[LOBBY] Joined Lobby Success',
  props<{ id: string }>(),
);

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
