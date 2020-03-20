import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets';
import { Server } from 'http';
import { Logger } from '@nestjs/common';
import { Socket } from 'socket.io';

@WebSocketGateway()
export class GameGateway {
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('GameGateway');

  @SubscribeMessage('game')
  handleMessage(client: Socket, payload: any) {
    this.server.emit('game', payload.value);
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
