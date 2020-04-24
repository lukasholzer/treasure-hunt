import { createAction, props } from '@ngrx/store';
import {
  PlayingPlayer,
  CardType,
  Player,
} from '@treasure-hunt/shared/interfaces';

export const loginFailed = createAction(
  '[SERVER] Login Failed',
  props<{ message: string }>(),
);

export const loginSuccess = createAction(
  '[SERVER] Login Success',
  props<{ player: Player }>(),
);

/** Only dispatched to the sender when he joins successfully the lobby */
export const joinLobbySuccess = createAction(
  '[SERVER] Join Lobby Success',
  props<{ players: Player[]; minPlayers: number; lobbyName: string }>(),
);

/** Dispatched to the sender when the joining to a lobby failed */
export const joinLobbyFailed = createAction(
  '[SERVER] Join Lobby Failed',
  props<{ message: string }>(),
);

/** Dispatched to all the remaining lobby members when a player leaves the lobby */
export const playerLeftLobby = createAction(
  '[SERVER] Player left the Lobby',
  props<{ playerId: string }>(),
);

/** Dispatched to the sender when he leaves the lobby */
export const leaveLobbySuccess = createAction(
  '[SERVER] Leave the lobby Success',
);

/** Dispatched to all participants in a lobby when a new player joins */
export const playerJoinedLobby = createAction(
  '[SERVER] Player joined the lobby',
  props<{ player: Player }>(),
);

export const startGameFailed = createAction(
  '[SERVER] Starting the game failed',
  props<{ message: string }>(),
);

export const gameStarted = createAction('[SERVER] The game has started now');
export const playerLeft = createAction('[SERVER] A player left the game');

export const getPlayerInfoSuccess = createAction(
  '[SERVER] Get Player information success',
  props<{
    role: CardType;
    hand: CardType[];
  }>(),
);

export const getGameStateSuccess = createAction(
  '[SERVER] Get Game State Success',
  props<{
    keyPlayer: string;
    roundsLeft: number;
    revealed: CardType[];
    winner: CardType | null;
    players: PlayingPlayer[];
  }>(),
);

export const playerPretendedHand = createAction(
  '[SERVER] Player pretended Hand',
  props<{
    playerId: string;
    hand: CardType[];
  }>(),
);

export const cardRevealSuccess = createAction(
  '[SERVER] Card Reveal Success',
  props<{
    id: string;
    card: CardType;
  }>(),
);
