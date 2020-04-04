import { Injectable, Logger } from '@nestjs/common';
import { Game } from '@treasure-hunt/api/game/core';
import { Player } from '@treasure-hunt/shared/interfaces';
import { Lobby } from './lobby';

export const PLAYER_ALREADY_IN_LOBBY_ERROR = (lobby: string) =>
  `Player is already in lobby ${lobby}`;

@Injectable()
export class LobbyService {
  /** List of players and their joined lobbies */
  playerList = new Map<string, string>();
  /** List of lobbies with their players */
  lobbies = new Map<string, Lobby>();

  private _logger = new Logger(this.constructor.name);

  /** A player joins the lobby returns true if successful */
  joinLobby(lobbyName: string, player: Player): void {
    if (this.playerList.has(player.id)) {
      if (this.playerList.get(player.id) !== lobbyName) {
        throw new Error(
          PLAYER_ALREADY_IN_LOBBY_ERROR(this.playerList.get(player.id)),
        );
      }
      // TODO: think about possible response.
      this._logger.verbose(
        `Player <${player.name}> is already in the lobby: ${lobbyName}`,
      );
    }

    if (this.lobbies.has(lobbyName)) {
      const lobby = this.lobbies.get(lobbyName);
      lobby.addPlayer(player);
      this._logger.verbose(
        `Player <${player.name}> joined the lobby: ${lobbyName}`,
      );
    } else {
      const lobby = new Lobby(lobbyName);
      lobby.addPlayer(player);
      this.lobbies.set(lobbyName, lobby);
      this._logger.verbose(
        `Player <${player.name}> created lobby: ${lobbyName}`,
      );
    }

    this.playerList.set(player.id, lobbyName);
  }

  /** Leaves the lobby */
  leaveLobby(lobbyName: string, playerId: string) {
    if (!this.lobbies.has(lobbyName)) {
      throw new Error(`The lobby ${lobbyName} does not exist!`);
    }

    const lobby = this.lobbies.get(lobbyName);
    const player = lobby.getPlayer(playerId);

    if (player) {
      lobby.removePlayer(playerId);
      this._logger.verbose(`Player <${player.name}> left the lobby ${lobbyName}`);
    }

    if (lobby.isEmpty) {
      this.lobbies.delete(lobbyName);
      this._logger.verbose(
        `Removed the lobby ${lobbyName} after the last player left.`,
      );
    }
  }
}
