import { Module, HttpModule } from '@nestjs/common';
import { AppGateway } from './app.gateway';
import { GameService } from './game.service';
import { GameController } from './game.controller';

// import { GameModule } from '../game/game.module';
// import { LobbyModule } from '../lobby/lobby.module';

@Module({
  imports: [
    HttpModule,
    // GameModule,
    // LobbyModule
  ],
  controllers: [GameController],
  providers: [AppGateway, GameService],
})
export class AppModule {}
