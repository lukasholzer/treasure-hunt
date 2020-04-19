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
  @Get('')
  listAllGames() {
    const games = this._gameService.games;
    return {
      count: games.length,
      games,
    };
  }
}
