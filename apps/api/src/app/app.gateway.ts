import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  WsResponse,
  WsException,
  OnGatewayDisconnect,
  OnGatewayConnection,
  OnGatewayInit,
} from '@nestjs/websockets';

import { Socket, Server } from 'socket.io';
import { Logger } from '@nestjs/common';
import { GameService } from './game.service';

const PLAYERS = new Set<string>();

@WebSocketGateway()
export class AppGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('App Gateway');

  constructor(private _gameService: GameService) {}

  handleConnection(client: Socket) {
    PLAYERS.add(client.id);
    const players = Array.from(PLAYERS.values());
    this.server.emit('actions', {
      type: 'player-joined',
      payload: {
        players,
      },
    });

    if (players.length === 3) {
      this._gameService.startGame(players);
      this.server.emit('actions', {
        type: 'game-started',
      });
    }
  }

  handleDisconnect(client: Socket) {
    this.server.emit('actions', { type: 'player-left' });
    this._gameService.resetGame();
    PLAYERS.delete(client.id);
  }

  @SubscribeMessage('actions')
  call(@ConnectedSocket() client: Socket, @MessageBody() data: any) {
    console.log(data);

    switch (data.type) {
      case 'tell-hand':
        const payload = this._gameService.pretendHand(
          client.id,
          data.payload.hand,
        );

        this.server.emit('actions', {
          type: 'game-state',
          payload,
        });
        break;
      case 'get-state':
        return {
          event: 'actions',
          data: {
            type: 'game-state',
            payload: this._gameService.getGameState(client.id),
          },
        };
      case 'ask-players-hand':
        client.to(data.payload.id).emit('actions', {
          type: 'ask-hand',
        });
        break;
    }
  }
}
