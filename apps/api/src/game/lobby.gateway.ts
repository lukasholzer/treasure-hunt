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
import { LobbyActions, Player } from '@treasure-hunt/shared/interfaces';
import { LobbyService } from './lobby.service';
import { of } from 'rxjs';

@WebSocketGateway({ namespace: '/lobby' })
export class LobbyGateway implements OnGatewayInit {
  @WebSocketServer() server: Server;

  private logger: Logger = new Logger('Lobby Gateway');

  constructor(private _lobbyService: LobbyService) {}

  afterInit(server: any) {
    this.logger.log('Initialized!');
  }

  @SubscribeMessage('chatToServer')
  handleMessage(
    client: Socket,
    message: { sender: string; room: string; message: string },
  ) {
    this.server.to(message.room).emit('chatToClient', message);
  }

  @SubscribeMessage('joinLobby')
  handleLobbyJoin(
    @MessageBody() data: { name: string, player: Player },
    @ConnectedSocket() client: Socket,
  ) {
    if (this._lobbyService.joinLobby(data.name, data.player)) {
      client.join(data.name)
    }

    client.emit('actions', {
      type: LobbyActions.joinedLobby,
      payload: data.name,
    });

    // send to all in the room the updated player list
    return {
      event: 'actions',
      data: {
        type: LobbyActions.playerJoined,
        payload: this._lobbyService.lobbies.get(data.name),
      }
    }
  }

  @SubscribeMessage('leaveLobby')
  handleLobbyLeave(
    @MessageBody() data: { name: string, id: string },
    @ConnectedSocket() client: Socket,
  ) {
    const { name, id } = data;
    this._lobbyService.leaveLobby(data.name, id)
    client.leave(name);

    return {
      event: 'actions',
      data: {
        type: LobbyActions.playerJoined,
        payload: this._lobbyService.lobbies.get(name),
      }
    }
  }
}
