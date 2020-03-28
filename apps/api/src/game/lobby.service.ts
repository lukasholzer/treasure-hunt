import { Injectable } from '@nestjs/common';
import { Game } from '@treasure-hunt/api/game/core';
import { Player } from '@treasure-hunt/shared/interfaces';
@Injectable()
export class LobbyService {
  lobbies = new Map<string, Player[]>();

  /** A player joins the lobby returns true if successful */
  joinLobby(lobbyName: string, player: Player): boolean {
    if (!this.lobbies.has(lobbyName)) {
      this.lobbies.set(lobbyName, [player]);
      return true;
    }

    const lobby = this.lobbies.get(lobbyName);
    const index = lobby.findIndex(({ id }) => player.id === id);

    if (index < 0) {
      lobby.push(player);
      return true;
    }
    return false;
  }

  leaveLobby(lobbyName: string, playerId: string) {
    const lobby = this.lobbies.get(lobbyName);
    const index = lobby.findIndex(({ id }) => playerId === id);

    if (index >= 0) {
      lobby.splice(index, 1);
    }

    if (lobby.length === 0) {
      this.lobbies.delete(lobbyName);
    }
  }
}
