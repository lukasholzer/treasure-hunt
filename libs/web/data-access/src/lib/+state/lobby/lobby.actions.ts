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
  '[LOBBY] Joined the lobby Successfully',
  props<{ id: string }>(),
);

export const leaveLobby = createAction('[LOBBY] Leave lobby');
export const leaveLobbySuccess = createAction('[LOBBY] Left the lobby');

/**
 * When the player gets kicked out of internet or the screen has to reload
 * try to use the persisted lobby name and reconnect if it is still active
 */
export const lobbyReconnect = createAction('[LOBBY] Try lobby reconnect');


export const playersUpdated = createAction(
  '[LOBBY] Updated players in the Lobby',
  props<{ players: Player[] }>(),
);

export const revealCharacter = createAction('[GAME] Reveal Character');
export const revealCharacterSuccess = createAction(
  '[GAME] Successfully revealed the character',
  props<{ character: CardType }>(),
);
