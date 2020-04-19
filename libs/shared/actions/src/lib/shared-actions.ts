import { createAction, props } from '@ngrx/store';
import { Player, CardType } from '@treasure-hunt/shared/interfaces';

export const playerJoined = createAction(
  '[SERVER] Player joined the game',
  props<{ players: Player[] }>(),
);


export const gameStarted = createAction('[SERVER] The game has started now');
export const playerLeft = createAction('[SERVER] A player left the game');

export const getGameState = createAction('[SERVER] Get game state');
export const getGameStateSuccess = createAction(
  '[SERVER] Get Game State Success',
  props<{
    keyPlayer: string;
    rounds: number;
    role: CardType;
    hand: CardType[];
  }>(),
);

export const playerPretendedHand = createAction(
  '[SERVER] Player pretended Hand',
  props<{
    id: string;
    hand: CardType[];
  }>(),
);

export const cardRevealSuccess = createAction(
  '[SERVER] Card Reveal Success',
  props<{
    id: string;
    card: CardType;
  }>(),
)
