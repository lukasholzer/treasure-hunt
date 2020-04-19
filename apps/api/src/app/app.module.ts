import { Module, HttpModule } from '@nestjs/common';
import { AppGateway } from './app.gateway';
import { GameService } from './game/game.service';
import { GameController } from './game/game.controller';
import { LobbyService } from './lobby/lobby.service';

// import { GameModule } from '../game/game.module';
// import { LobbyModule } from '../lobby/lobby.module';

@Module({
  imports: [
    HttpModule,
    // GameModule,
    // LobbyModule
  ],
  controllers: [GameController],
  providers: [AppGateway, LobbyService, GameService],
})
export class AppModule {}
