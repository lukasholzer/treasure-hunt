import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import {
  CardType,
  MESSAGE_TYPES,
  Player,
} from '@treasure-hunt/shared/interfaces';
import { Server } from 'http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { GameStoreFacade } from './+state';

@WebSocketGateway({ namespace: '/game' })
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
  assignCharacter(
    @MessageBody() data: Player,
  ): Observable<WsResponse<CardType>> {
    this._game.assignCharacter(data);
    return this.buildResponse(
      MESSAGE_TYPES.assignCharacter,
      this._game.character$(data),
    );
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
