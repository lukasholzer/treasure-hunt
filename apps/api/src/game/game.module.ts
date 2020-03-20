import { Module } from '@nestjs/common';
import { GameGateway } from './game.gateway';
import { PlayerService } from './player/player.service';

@Module({
  providers: [GameGateway, PlayerService]
})
export class GameModule {}
