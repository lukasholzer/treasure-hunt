import { Module } from '@nestjs/common';
import { GameStoreFacade } from './+state';
import { GameGateway } from './game.gateway';

@Module({
  providers: [GameGateway, GameStoreFacade],
})
export class GameModule {}
