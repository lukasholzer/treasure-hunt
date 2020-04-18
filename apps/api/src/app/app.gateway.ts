import { HttpService, Logger } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import {
  gameStarted,
  playerJoined,
  playerLeft,
  getGameStateSuccess,
  playerPretendedHand,
} from '@treasure-hunt/shared/actions';
import { Player } from '@treasure-hunt/shared/interfaces';
import { map } from 'rxjs/operators';
import { Server, Socket } from 'socket.io';
import { GameService } from './game.service';

const PLAYERS = new Map<string, Player>();

@WebSocketGateway()
export class AppGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('App Gateway');

  constructor(private _http: HttpService, private _gameService: GameService) {}

  async handleConnection(client: Socket) {
    const { name } = await this._http
      .get('https://randomuser.me/api/')
      .pipe(map(({ data }) => data.results[0]))
      .toPromise();

    PLAYERS.set(client.id, {
      id: client.id,
      name: name.first,
      image: `https://api.adorable.io/avatars/400/${name.first}`,
    });

    const players = Array.from(PLAYERS.values());

    this.server.emit('actions', playerJoined({ players }));

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
    console.log(data)

    switch (data.type) {
      case 'tell-hand':
        this._gameService.pretendHand(client.id, data.payload.hand);
        this.server.emit(
          'actions',
          playerPretendedHand({
            id: client.id,
            hand: data.payload.hand,
          }),
        );
        break;
      case 'GameMessageTypes.RequestGameState':
        return {
          event: 'actions',
          data: getGameStateSuccess(this._gameService.getGameState(client.id)),
        };
      // case 'ask-players-hand':
      //   client.to(payload.id).emit('actions', {
      //     type: 'ask-hand',
      //   });
      //   break;
    }
  }
}
