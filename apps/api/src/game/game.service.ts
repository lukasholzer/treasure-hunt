import { Injectable, Logger, Scope } from '@nestjs/common';
import { Game } from '@treasure-hunt/api/game/core';
import { Player } from '@treasure-hunt/shared/interfaces';

export const GAME_NOT_FOUND_ERROR = (lobbyName: string) =>
  `No game found for the lobby ${lobbyName}!`;


/** List of all games id is the lobby name */
const GAMES = new Map<string, Game>();

@Injectable({
  scope: Scope.DEFAULT
})
export class GameService {
  /** Logger for the game service */
  private readonly _logger = new Logger(this.constructor.name);

  /** @internal resets all games */
  reset(): void {
    GAMES.clear();
    this._logger.verbose(`🎲\tAll Games are reset!`);
  }

  /** Get a game by its lobby name */
  getGame(lobbyName: string): Game {
    if (!GAMES.has(lobbyName)) {
      throw new Error(GAME_NOT_FOUND_ERROR(lobbyName));
    }
    return GAMES.get(lobbyName);
  }


  /** starts a new Game */
  startGame(lobbyName: string, players: Player[]): void {
    // If there is no game for the lobby then start one
    if (!GAMES.has(lobbyName)) {
      const game = new Game(players);

      GAMES.set(lobbyName, game);
      this._logger.verbose(
        `Started a new game for the lobby <${lobbyName}> with ${players.length} players.`,
      );
    }
  }
}
