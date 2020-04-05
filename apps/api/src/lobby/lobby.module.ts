import { Module } from '@nestjs/common';
import { LobbyGateway } from './lobby.gateway';
import { LobbyService } from './lobby.service';
import { GameService } from '../game/game.service';
import { LobbyController } from './lobbby.controller';

@Module({
  controllers: [LobbyController],
  providers: [LobbyGateway, LobbyService, GameService],
})
export class LobbyModule {}
