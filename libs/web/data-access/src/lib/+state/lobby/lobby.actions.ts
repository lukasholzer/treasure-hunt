import { createAction, props } from '@ngrx/store';
import { Player, CardType } from '@treasure-hunt/shared/interfaces';

export const leaveLobby = createAction('[LOBBY] Leave lobby');
export const logout = createAction('[LOBBY] Logout');

// export const playersUpdated = createAction(
//   '[LOBBY] Updated players in the Lobby',
//   props<{ players: Player[] }>(),
// );

// export const revealCharacter = createAction('[GAME] Reveal Character');
// export const revealCharacterSuccess = createAction(
//   '[GAME] Successfully revealed the character',
//   props<{ character: CardType }>(),
// );
