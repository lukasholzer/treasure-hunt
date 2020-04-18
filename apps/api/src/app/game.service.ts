import { Injectable, Logger, Scope } from '@nestjs/common';
import { Game } from '@treasure-hunt/api/game/core';
import { CardType, Player } from '@treasure-hunt/shared/interfaces';

/** List of all games id is the lobby name */
const GAMES = new Map<string, Game>();

const lobbyName = 'test';

@Injectable()
export class GameService {
  private _logger: Logger = new Logger('Game Service');

  getGameState(id: string) {
    const game = GAMES.get(lobbyName);

    if (!game) {
      return null;
    }

    const player = game.players.find(p => p.id === id);

    return {
      keyPlayer: game.keyPlayer,
      rounds: game.rounds,
      role: player.role,
      hand: player.hand,
    };
  }

  pretendHand(id: string, hand: CardType[]): void {
    const game = GAMES.get(lobbyName);
    const playerIndex = game.getPlayerIndex(id);
    game.pretend(playerIndex, hand);
  }

  resetGame() {
    GAMES.delete(lobbyName);
  }

  /** starts a new Game */
  startGame(players: Player[]): void {
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
