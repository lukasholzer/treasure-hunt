import { Module } from '@nestjs/common';
import { GameGateway } from './game.gateway';
import { GameService } from './game.service';
import { GameController } from './game.controller';

@Module({
  controllers: [GameController],
  providers: [GameGateway, GameService],
})
export class GameModule {}
