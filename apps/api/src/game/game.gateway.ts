import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  WsResponse,
} from '@nestjs/websockets';

import { Socket, Server } from 'socket.io';
import { Logger } from '@nestjs/common';
import {
  GameActions,
  Player,
  GameMessageTypes,
  SocketAction,
} from '@treasure-hunt/shared/interfaces';
import { GameService } from './game.service';

@WebSocketGateway({ namespace: '/game' })
export class GameGateway {
  @WebSocketServer() server: Server;

  private logger: Logger = new Logger('Game Gateway');

  constructor(private readonly _gameService: GameService) {}

  @SubscribeMessage(GameMessageTypes.revealCharacter)
  getCharacter(
    @MessageBody() data: { lobby: string; player: Player },
  ): WsResponse<SocketAction> {
    const { lobby, player } = data;

    const game = this._gameService.getGame(lobby);
    const playingPlayer = game.players.find(({ id }) => player.id === id);

    return {
      event: 'actions',
      data: {
        type: GameActions.getCharacterCard,
        payload: playingPlayer.role,
      },
    };
  }
}
