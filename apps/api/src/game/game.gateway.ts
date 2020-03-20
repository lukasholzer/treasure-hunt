import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets';
import { Server } from 'http';
import { Logger } from '@nestjs/common';
import { Socket } from 'socket.io';
import { PlayerService } from './player/player.service';

@WebSocketGateway()
export class GameGateway {
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('GameGateway');

  constructor(private players: PlayerService){}

  @SubscribeMessage('game')
  handleMessage(client: Socket, payload: any) {
    console.log(payload)
    this.server.emit('game', payload);
  }

  afterInit(server: Server) {
    this.logger.log('Init');
  }
  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
  }
}
