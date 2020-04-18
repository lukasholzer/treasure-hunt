import { Injectable, Logger, Scope } from '@nestjs/common';
import { Game } from '@treasure-hunt/api/game/core';
import { CardType } from '../../../../libs/shared/interfaces/src';

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
      players: game.players.map(({ id, pretendedHand }) => ({
        id,
        pretendedHand,
      })),
    };
  }

  pretendHand(id: string, hand: CardType[]) {
    const game = GAMES.get(lobbyName);
    const playerIndex = game.getPlayerIndex(id);
    game.pretend(playerIndex, hand);

    return this.getGameState(id);
  }

  resetGame() {
    GAMES.delete(lobbyName);
  }

  /** starts a new Game */
  startGame(players: string[]): void {
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
