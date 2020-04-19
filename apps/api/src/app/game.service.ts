import { Injectable, Logger } from '@nestjs/common';
import { Game } from '@treasure-hunt/api/game/core';
import {
  cardRevealSuccess,
  getGameStateSuccess,
  getPlayerInfoSuccess,
  playerPretendedHand,
} from '@treasure-hunt/shared/actions';
import { CardType, Player } from '@treasure-hunt/shared/interfaces';
/** List of all games id is the lobby name */
const GAMES = new Map<string, Game>();

const lobbyName = 'test';

@Injectable()
export class GameService {
  private _logger: Logger = new Logger('Game Service');

  get games() {
    return Array.from(GAMES.values());
  }

  getGameState() {
    const game = GAMES.get(lobbyName);

    if (!game) {
      return null;
    }

    return getGameStateSuccess({
      keyPlayer: game.keyPlayer,
      revealed: game.deck.revealed,
      roundsLeft: game.rounds,
      winner: game.isFinished(),
      players: game.players,
    });
  }

  getPlayerDetails(playerId: string) {
    const game = GAMES.get(lobbyName);
    const player = game._players.find(({ id }) => id === playerId);

    return getPlayerInfoSuccess({
      role: player.role,
      hand: player.hand,
    });
  }

  pretendHand(id: string, hand: CardType[]) {
    const game = GAMES.get(lobbyName);
    const playerIndex = game.getPlayerIndex(id);
    game.pretend(playerIndex, hand);
    return playerPretendedHand({ id, hand });
  }

  hasStarted(): boolean {
    return GAMES.has(lobbyName);
  }

  resetGame() {
    GAMES.delete(lobbyName);
  }

  revealCard(clientId: string, playerId: string, cardIndex: number) {
    const game = GAMES.get(lobbyName);

    // if (clientId === game.keyPlayer) {
      const card = game.reveal(playerId, cardIndex);
      game.keyPlayer = playerId;

      if (game.moves === game.rounds) {
        game.finishRound();
      }

      return cardRevealSuccess({ id: playerId, card });
    // }
    // throw Error('The player is not the key Player!');
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
