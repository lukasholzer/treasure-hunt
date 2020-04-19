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
  RevealCardData,
  SocketMessages,
  TellHandData,
} from '@treasure-hunt/shared/actions';
import { Player } from '@treasure-hunt/shared/interfaces';
import { map } from 'rxjs/operators';
import { Server, Socket } from 'socket.io';
import { GameService } from './game.service';

const PLAYERS = new Map<string, Player>();

@WebSocketGateway({ transports: ['websocket'] })
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

  @SubscribeMessage(SocketMessages.TellHand)
  tellHand(
    @ConnectedSocket() { id }: Socket,
    @MessageBody() data: TellHandData,
  ) {
    const { hand } = data;
    this.server.emit('actions', this._gameService.pretendHand(id, hand));
  }

  @SubscribeMessage(SocketMessages.RevealCard)
  revealCard(
    @ConnectedSocket() { id }: Socket,
    @MessageBody() data: RevealCardData,
  ) {
    const { playerId, cardIndex } = data;
    this.server.emit(
      'actions',
      this._gameService.revealCard(id, playerId, +cardIndex),
    );
  }

  @SubscribeMessage(SocketMessages.GetGameState)
  getGameState() {
    return {
      event: 'actions',
      data: this._gameService.getGameState(),
    };
  }

  @SubscribeMessage(SocketMessages.GetPlayerDetails)
  getPlayerDetails(@ConnectedSocket() { id }: Socket) {
    return {
      event: 'actions',
      data: this._gameService.getPlayerDetails(id),
    };
  }
}
