import {
  Controller,
  Get,
  Put,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { GameService } from './game.service';

@Controller('game')
export class GameController {
  constructor(private _gameService: GameService) {}

  // TODO: add route protection for admins.
  @Get('/all')
  listAllGames() {
    const games = this._gameService.games;
    return {
      count: games.length,
      games,
    };
  }

  /** Used by the game guard to check if the game exists */
  @Get('exists/:id')
  gameExists(@Param('id') id: string): void {
    try {
      this._gameService.getGame(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  // TODO: add route protection for admins.
  @Get('/reset')
  reset() {
    this._gameService.reset();
    return {
      message: 'All games resetted!'
    };
  }
}
