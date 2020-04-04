import { Module } from '@nestjs/common';

import { GameModule } from '../game/game.module';
import { LobbyModule } from '../lobby/lobby.module';

@Module({
  imports: [GameModule, LobbyModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
