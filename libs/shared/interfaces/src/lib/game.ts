export const enum GameMessageTypes {
  revealCharacter = 'revealCharacter',
  getHand = 'getHand',
  call = 'call',
}

export const enum GameActions {
  getCharacterCard = '[GAME SOCKET] Get character card',
  getHand = '[GAME SOCKET] Get player hand',
  playerCalled = '[GAME SOCKET] Player called',
  /**
   * If a player disconnects from the socket this event is emitted to all
   * others if the client does not connect again in a certain amount of
   * time the game will be canceled
   */
  playerUnavailable = '[GAME SOCKET] Player Unavailable',
}
