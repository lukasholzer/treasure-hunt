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

/**
 * When the player gets kicked out of internet or the screen has to reload
 * try to use the persisted lobby name and reconnect if it is still active
 */
export const lobbyReconnect = createAction('[LOBBY] Try lobby reconnect');

export const leaveLobby = createAction('[LOBBY] Leave Lobby');
export const leaveLobbySuccess = createAction('[LOBBY] Leave Lobby Success');

export const joinedLobbySuccess = createAction(
  '[LOBBY] Joined Lobby Success',
  props<{ id: string }>(),
);

export const playersUpdated = createAction(
  '[LOBBY] Updated players in the Lobby',
  props<{ players: Player[] }>(),
);

export const startGame = createAction('[LOBBY] Start Game');
export const gameStarted = createAction('[LOBBY] Game has started');

export const revealCharacter = createAction('[GAME] Reveal Character');
export const revealCharacterSuccess = createAction(
  '[GAME] Successfully revealed the character',
  props<{ character: CardType }>(),
);

// export const joinGameSuccess = createAction(
//   '[Game] Register Player Success',
//   props<{ player: Player }>(),
// );

// export const assignCharacter = createAction(
//   '[Game] Draw Character card and assign it.',
// );
// export const assignCharacterSuccess = createAction(
//   '[Game] Got successfully a character Assigned',
//   props<{ character: CardType }>(),
// );
