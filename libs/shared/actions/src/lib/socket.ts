import { CardType } from '@treasure-hunt/shared/interfaces';

export const enum SocketMessages {
  Login = 'login',
  JoinLobby = 'join-lobby',
  LeaveLobby = 'leave-lobby',
  StartGame = 'start-game',
  GetGameState = 'get-game-state',
  GetPlayerDetails = 'get-player-details',
  RevealCard = 'reveal-card',
  TellHand = 'tell-hand',
}

export interface JoinLobbyData {
  lobbyName: string;
}

export interface LoginData {
  name: string;
  avatar: string;
}

export interface RevealCardData {
  playerId: string;
  cardIndex: number;
}

export interface TellHandData {
  hand: CardType[];
}
