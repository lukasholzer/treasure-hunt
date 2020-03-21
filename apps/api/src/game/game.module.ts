import { Module } from '@nestjs/common';
import { GameStoreFacade } from './+state';
import { GameGateway } from './game.gateway';
import { GameService } from './game.service';
import { PlayerService } from './player/player.service';

@Module({
  providers: [GameGateway, PlayerService, GameService, GameStoreFacade]
})
export class GameModule {}
