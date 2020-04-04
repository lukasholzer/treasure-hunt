export const enum LobbyMessageTypes {
  joinLobby = 'joinLobby',
  leaveLobby = 'leaveLobby',
  startGame = 'startGame',
}

export const enum LobbyActions {
  joinedLobby = '[LOBBY SOCKET] joined the Lobby',
  leftLobby = '[LOBBY SOCKET] left the Lobby',
  playersUpdated = '[LOBBY SOCKET] Updated the players in the lobby',
  gameStarted = '[LOBBY SOCKET] Started Game',
}
