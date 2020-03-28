import { Module } from '@nestjs/common';
import { GameStoreFacade } from './+state';
import { GameGateway } from './game.gateway';
import { LobbyGateway } from './lobby.gateway';

@Module({
  providers: [LobbyGateway, GameGateway, GameStoreFacade],
})
export class GameModule {}
