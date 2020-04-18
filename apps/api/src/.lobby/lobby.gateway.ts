import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  WsResponse,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { Logger } from '@nestjs/common';
import {
  LobbyActions,
  Player,
  LobbyMessageTypes,
} from '@treasure-hunt/shared/interfaces';
import { LobbyService } from './lobby.service';
import { of } from 'rxjs';
import { GameService } from '../game/game.service';

const logger: Logger = new Logger('Lobby Gateway');

@WebSocketGateway({ namespace: '/lobby' })
export class LobbyGateway implements OnGatewayConnection {
  @WebSocketServer() server: Server;

  constructor(
    private readonly _lobbyService: LobbyService,
    private readonly _gameService: GameService,
  ) {}

  handleConnection(client: Socket, ...args: any[]) {
    // this is executed on new connection
  }

  @SubscribeMessage(LobbyMessageTypes.joinLobby)
  joinLobby(
    @MessageBody() data: { name: string; player: Player },
    @ConnectedSocket() client: Socket,
  ) {
    const { name, player } = data;

    try {
      this._lobbyService.joinLobby(name, player);
      client.join(name);

      client.emit('actions', {
        type: LobbyActions.joinedLobby,
        payload: name,
      });

      // send to all in the room the updated player list
      this.server.to(name).emit('actions', {
        type: LobbyActions.playersUpdated,
        payload: this._lobbyService.getLobby(name).players,
      });
    } catch (error) {
      logger.error(error.message);
    }
  }

  @SubscribeMessage(LobbyMessageTypes.leaveLobby)
  leaveLobby(
    @MessageBody() data: { name: string; id: string },
    @ConnectedSocket() client: Socket,
  ) {
    const { name, id } = data;

    try {
      this._lobbyService.leaveLobby(data.name, id);
      client.leave(name);

      this.server.to(data.name).emit('actions', {
        type: LobbyActions.playersUpdated,
        payload: this._lobbyService.getLobby(name).players,
      });
    } catch (error) {
      logger.error(error.message);
    }
  }

  @SubscribeMessage(LobbyMessageTypes.startGame)
  startGame(@MessageBody() data: { name: string }) {
    const { name } = data;

    const lobby = this._lobbyService.getLobby(name);
    this._gameService.startGame(name, lobby.players);

    this.server.to(name).emit('actions', {
      type: LobbyActions.gameStarted,
    });
  }
}
