import { Injectable } from '@nestjs/common';
import { Game } from '@treasure-hunt/api/game/core';
import { Player } from '@treasure-hunt/shared/interfaces';
@Injectable()
export class GameService {
  games: Map<string, Game>;

  startGame(players: Player[]) {
    const game = new Game(players);
    this.games.set(game.id, game);
  }
}
