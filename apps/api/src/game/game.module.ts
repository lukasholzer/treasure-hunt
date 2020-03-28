import { Module } from '@nestjs/common';
import { GameGateway } from './game.gateway';
import { LobbyGateway } from './lobby.gateway';
import { LobbyService } from './lobby.service';
import { GameService } from './game.service';

@Module({
  providers: [LobbyGateway, LobbyService, GameGateway, GameService],
})
export class GameModule {}
