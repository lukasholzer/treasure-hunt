import { Logger } from '@nestjs/common';
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  MessageBody,
  WsResponse
} from '@nestjs/websockets';
import { MESSAGE_TYPES, SocketMessage } from '@witch-hunter/api-interfaces';
import { Server } from 'http';
import { Socket } from 'socket.io';
import { GameService } from './game.service';
import { of, from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@WebSocketGateway()
export class GameGateway {
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('GameGateway');

  constructor(private gameService: GameService) {}

  @SubscribeMessage('game')
  onGame(@MessageBody() data: SocketMessage): Observable<WsResponse<any>> {
    return of({
      event: 'game',
      data: undefined
    });
  }

  @SubscribeMessage('events')
  onEvent(@MessageBody() data: SocketMessage): Observable<WsResponse<any>> {
    switch (data.type) {
      case MESSAGE_TYPES.joinGame:
        this.gameService.join(data.value);
        return this.buildResponse(
          MESSAGE_TYPES.playerJoined,
          this.gameService.players$
        );
      default:
        return of({
          event: 'events',
          data: undefined
        });
    }
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

  private buildResponse<T>(
    type: MESSAGE_TYPES,
    payload: Observable<T>,
    channel: string = 'events'
  ): Observable<WsResponse<SocketMessage<T>>> {
    return payload.pipe(
      map(data => ({
        event: channel,
        data: {
          type,
          value: data
        }
      }))
    );
  }
}
