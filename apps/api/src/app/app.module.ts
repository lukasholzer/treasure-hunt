import { Module, HttpModule } from '@nestjs/common';
import { AppGateway } from './app.gateway';
import { GameService } from './game/game.service';
import { GameController } from './game/game.controller';
import { LobbyService } from './lobby/lobby.service';
import { LobbyController } from './lobby/lobbby.controller';

@Module({
  imports: [HttpModule],
  controllers: [GameController, LobbyController],
  providers: [AppGateway, LobbyService, GameService],
})
export class AppModule {}
