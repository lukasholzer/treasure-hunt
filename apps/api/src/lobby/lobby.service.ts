import { Injectable, Logger } from '@nestjs/common';
import { Game } from '@treasure-hunt/api/game/core';
import { Player } from '@treasure-hunt/shared/interfaces';
import { Lobby } from './lobby';

export const PLAYER_ALREADY_IN_LOBBY_ERROR = (lobby: string) =>
  `Player is already in lobby ${lobby}!`;

export const LOBBY_NOT_FOUND_ERROR = (lobby: string) =>
  `The lobby with the name ${lobby} does not exist!`;

export const PLAYER_NOT_FOUND_ERROR = (id: string) =>
  `The player with the id ${id} does not exist!`;

@Injectable()
export class LobbyService {
  /** List of players and their joined lobbies */
  private readonly _playerList = new Map<string, string>();
  /** List of lobbies with their players */
  private readonly _lobbies = new Map<string, Lobby>();
  /** Logger for the service */
  private readonly _logger = new Logger(this.constructor.name);

  /** @internal A JSON representation of all lobbies */
  get lobbies() {
    return Array.from(this._lobbies.values()).map(lobby => lobby.toJSON());
  }

  /** @internal resets all lobbies and player lists */
  reset(): void {
    this._lobbies.clear();
    this._playerList.clear();
    this._logger.verbose(`🛋\tAll lobbies are reset!`);
  }

  /** Get a lobby by its name */
  getLobby(lobbyName: string): Lobby {
    if (!this._lobbies.has(lobbyName)) {
      throw new Error(LOBBY_NOT_FOUND_ERROR(lobbyName));
    }
    return this._lobbies.get(lobbyName);
  }

  /** A player joins the lobby returns true if successful */
  joinLobby(lobbyName: string, player: Player): void {
    if (this._playerList.has(player.id)) {
      if (this._playerList.get(player.id) !== lobbyName) {
        throw new Error(
          PLAYER_ALREADY_IN_LOBBY_ERROR(this._playerList.get(player.id)),
        );
      }
      // TODO: think about possible response.
      this._logger.verbose(
        `Player <${player.name}> is already in the lobby: ${lobbyName}`,
      );
      return;
    }

    if (this._lobbies.has(lobbyName)) {
      const lobby = this._lobbies.get(lobbyName);
      lobby.addPlayer(player);
      this._logger.verbose(
        `🛋\tPlayer <${player.name}> joined the lobby: ${lobbyName}`,
      );
    } else {
      const lobby = new Lobby(lobbyName);
      lobby.addPlayer(player);
      this._lobbies.set(lobbyName, lobby);
      this._logger.verbose(
        `🛋\tPlayer <${player.name}> created lobby: ${lobbyName}`,
      );
    }

    this._playerList.set(player.id, lobbyName);
  }

  /** Leaves the lobby */
  leaveLobby(lobbyName: string, playerId: string) {
    if (!this._lobbies.has(lobbyName)) {
      throw new Error(`The lobby ${lobbyName} does not exist!`);
    }

    // delete player from playerList
    this._playerList.delete(playerId);

    const lobby = this._lobbies.get(lobbyName);
    const player = lobby.getPlayer(playerId);

    if (player) {
      lobby.removePlayer(playerId);
      this._logger.verbose(
        `🛋\tPlayer <${player.name}> left the lobby ${lobbyName}`,
      );
    }

    if (lobby.isEmpty) {
      this._lobbies.delete(lobbyName);
      this._logger.verbose(
        `🛋\tRemoved the lobby ${lobbyName} after the last player left.`,
      );
    }
  }
}
