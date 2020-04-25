import { Module, HttpModule } from '@nestjs/common';
import { AppGateway } from './app.gateway';
import { GameService } from './game/game.service';
import { GameController } from './game/game.controller';
import { LobbyService } from './lobby/lobby.service';
import { LobbyController } from './lobby/lobbby.controller';
import { RedisModule } from 'nestjs-redis';
import { environment } from '../environments/environment';
import { PlayerService } from './player/player.service';

@Module({
  imports: [HttpModule, RedisModule.register(environment.redis)],
  controllers: [GameController, LobbyController],
  providers: [AppGateway, LobbyService, GameService, PlayerService],
})
export class AppModule {}
