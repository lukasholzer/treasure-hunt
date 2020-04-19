import { HttpService, Logger } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
} from '@nestjs/websockets';
import {
  gameStarted,
  playerJoined,
  playerLeft,
  getGameStateSuccess,
  playerPretendedHand,
  getGameState,
  cardRevealSuccess,
} from '@treasure-hunt/shared/actions';
import { Player } from '@treasure-hunt/shared/interfaces';
import { map } from 'rxjs/operators';
import { Server, Socket } from 'socket.io';
import { GameService } from './game.service';
import { of } from 'rxjs';
import { ofType } from '@ngrx/effects';

const PLAYERS = new Map<string, Player>();

@WebSocketGateway({ transports: ['websocket']})
export class AppGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('App Gateway');

  constructor(private _http: HttpService, private _gameService: GameService) {}

  async handleConnection(client: Socket) {
    const { name } = await this._http
      .get('https://randomuser.me/api/')
      .pipe(map(({ data }) => data.results[0]))
      .toPromise();

    const player = {
      id: client.id,
      name: name.first,
      image: `https://api.adorable.io/avatars/400/${name.first}`,
    };

    PLAYERS.set(client.id, player);

    const players = Array.from(PLAYERS.values());

    this.server.emit('actions', playerJoined({ player }));

    if (players.length === 3) {
      this._gameService.startGame(players);
      this.server.emit('actions', gameStarted());
    }
  }

  handleDisconnect(client: Socket) {
    this.server.emit('actions', playerLeft());
    this._gameService.resetGame();
    PLAYERS.delete(client.id);
  }

  @SubscribeMessage('actions')
  call(@ConnectedSocket() client: Socket, @MessageBody() data: any) {
    const { type, payload } = data;

    switch (type) {
      case 'tell-hand':
        this._gameService.pretendHand(client.id, payload.hand);
        this.server.emit(
          'actions',
          playerPretendedHand({
            id: client.id,
            hand: payload.hand,
          }),
        );
        break;
      case 'get-game-state':
        return {
          event: 'actions',
          data: getGameStateSuccess(this._gameService.getGameState(client.id)),
        };
      case 'reveal-card':
        const card = this._gameService.revealCard(
          client.id,
          payload.playerId,
          parseInt(payload.cardIndex, 10),
        );
        this.server.emit(
          'actions',
          cardRevealSuccess({ id: payload.playerId, card }),
        );
        break;
    }
  }
}
