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
