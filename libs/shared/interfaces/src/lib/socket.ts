import { LobbyActions, LobbyMessageTypes } from './lobby';
import { GameActions, GameMessageTypes } from './game';

export type SocketActionTypes = LobbyActions | GameActions;
export type SocketMessageTypes = LobbyMessageTypes | GameMessageTypes;

export interface SocketAction<T = any> {
  type: SocketActionTypes;
  payload: T;
}
