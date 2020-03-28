export const enum LobbyActions {
  joinedLobby = '[LOBBY SOCKET] joined the Lobby',
  leftLobby = '[LOBBY SOCKET] left the Lobby',
  playerJoined = '[LOBBY SOCKET] Player joined the Lobby',
}

export interface SocketAction<T = any> {
  type: LobbyActions;
  payload: T;
}

export interface SocketMessage<T = any> {
  type: MESSAGE_TYPES;
  value?: T;
}

export const enum MESSAGE_TYPES {
  playerJoined = 'PLAYER_JOINED',
  assignCharacter = 'ASSIGN_CHARACTER',
  joinGame = 'JOIN_GAME',
  game = 'GAME',
  startGame = 'START_GAME',
}
