import { Module } from '@nestjs/common';
import { LobbyGateway } from './lobby.gateway';
import { LobbyService } from './lobby.service';
import { GameService } from '../game/game.service';

@Module({
  providers: [LobbyGateway, LobbyService, GameService],
})
export class LobbyModule {}
