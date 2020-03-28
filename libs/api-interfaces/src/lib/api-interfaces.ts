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
