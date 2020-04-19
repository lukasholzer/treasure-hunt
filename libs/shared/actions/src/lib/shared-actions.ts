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

export const joinLobbySuccess = createAction(
  '[SERVER] Join Lobby Success',
  props<{ player: Player }>(),
);

export const joinLobbyFailed = createAction(
  '[SERVER] Join Lobby Failed',
  props<{ message: string }>(),
);

export const leaveLobbySuccess = createAction(
  '[SERVER] Player left the Lobby',
  props<{ playerId: string }>(),
);

export const playerJoined = createAction(
  '[SERVER] Player joined the game',
  props<{ player: Player }>(),
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
