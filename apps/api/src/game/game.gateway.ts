import { Logger } from '@nestjs/common';
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  MessageBody,
  WsResponse,
} from '@nestjs/websockets';
import {
  MESSAGE_TYPES,
  SocketMessage,
  CardType,
  Player,
} from '@witch-hunter/api-interfaces';
import { Server } from 'http';
import { Socket } from 'socket.io';
import { GameService } from './game.service';
import { of, from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GameStoreFacade } from './+state';

@WebSocketGateway()
export class GameGateway {
  @WebSocketServer() server: Server;

  constructor(private _game: GameStoreFacade) {}

  @SubscribeMessage(MESSAGE_TYPES.game)
  game(@MessageBody() data: any): Observable<WsResponse<any>> {
    return this.buildResponse(MESSAGE_TYPES.game, this._game.state$);
  }

  @SubscribeMessage(MESSAGE_TYPES.joinGame)
  joinGame(@MessageBody() data: Player): Observable<WsResponse<Player[]>> {
    this._game.join(data);
    return this.buildResponse(MESSAGE_TYPES.playerJoined, this._game.players$);
  }

  @SubscribeMessage(MESSAGE_TYPES.assignCharacter)
  assignCharacter(): Observable<WsResponse<CardType>> {
    return this.buildResponse(MESSAGE_TYPES.assignCharacter, of(16));
  }

  // afterInit(server: Server) {
  //   this.logger.log('Init');
  // }

  // handleDisconnect(client: Socket) {
  //   this.logger.log(`Client disconnected: ${client.id}`);
  // }

  // handleConnection(client: Socket, ...args: any[]) {
  //   this.logger.log(`Client connected: ${client.id}`);
  // }

  private buildResponse<T>(
    channel: MESSAGE_TYPES,
    payload: Observable<T>,
  ): Observable<WsResponse<T>> {
    return payload.pipe(
      map(data => ({
        event: channel,
        data,
      })),
    );
  }
}
