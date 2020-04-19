import { CardType } from '@treasure-hunt/shared/interfaces';

export const enum SocketMessages {
  GetGameState = 'get-game-state',
  GetPlayerDetails = 'get-player-details',
  RevealCard = 'reveal-card',
  TellHand = 'tell-hand',
}

export interface RevealCardData {
  playerId: string;
  cardIndex: number;
}

export interface TellHandData {
  hand: CardType[];
}
