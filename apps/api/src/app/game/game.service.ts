import { Injectable, Logger } from '@nestjs/common';
import { Game } from '@treasure-hunt/api/game/core';
import {
  cardRevealSuccess,
  getGameStateSuccess,
  getPlayerInfoSuccess,
  playerPretendedHand,
} from '@treasure-hunt/shared/actions';
import { CardType, Player } from '@treasure-hunt/shared/interfaces';
import { LobbyService } from '../lobby/lobby.service';

const NO_GAME_FOR_LOBBY_ERROR = (lobbyName: string) =>
  `No active Game for the lobby <${lobbyName}>`;

/** List of all games id is the lobby name */
const GAMES = new Map<string, Game>();

@Injectable()
export class GameService {
  private _logger: Logger = new Logger('Game Service');

  get games() {
    return Array.from(GAMES.values());
  }

  constructor(private _lobbyService: LobbyService) {}

  /** Get a game for the provided lobbyName if no game is found an error is thrown */
  getGame(playerId: string): Game {
    const lobbyName = this._lobbyService.getJoinedLobby(playerId);
    const game = GAMES.get(lobbyName);

    if (!game) {
      throw new Error(NO_GAME_FOR_LOBBY_ERROR(lobbyName));
    }
    return game;
  }

  getGameState(playerId: string) {
    const game = this.getGame(playerId);
    return getGameStateSuccess({
      keyPlayer: game.keyPlayer,
      revealed: game.deck.revealed,
      roundsLeft: game.rounds,
      winner: game.isFinished(),
      players: game.players,
    });
  }

  getPlayerDetails(playerId: string) {
    const game = this.getGame(playerId);
    const player = game._players.find(({ id }) => id === playerId);

    return getPlayerInfoSuccess({
      role: player.role,
      hand: player.hand,
    });
  }

  pretendHand(playerId: string, hand: CardType[]) {
    const game = this.getGame(playerId);
    const playerIndex = game.getPlayerIndex(playerId);
    game.pretend(playerIndex, hand);
    return playerPretendedHand({ playerId, hand });
  }

  resetGame(lobbyName: string): void {
    GAMES.delete(lobbyName);
  }

  revealCard(clientId: string, playerId: string, cardIndex: number) {
    const game = this.getGame(clientId);

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
  startGame(players: Player[], lobbyName: string): void {
    // If there is no game for the lobby then start one
    if (!GAMES.has(lobbyName)) {
      const game = new Game(players);

      GAMES.set(lobbyName, game);
      this._logger.verbose(
        `Started a new game for the lobby <${lobbyName}> with ${players.length} players.`,
      );
    } else {
      throw new Error("Game has already started for lobby")
    }
  }
}
