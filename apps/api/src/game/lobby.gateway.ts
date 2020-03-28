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


const logger: Logger = new Logger('Lobby Gateway');

@WebSocketGateway({ namespace: '/lobby' })
export class LobbyGateway implements OnGatewayInit {
  @WebSocketServer() server: Server;


  constructor(private _lobbyService: LobbyService) {}

  afterInit(server: any) {
    logger.log('Initialized!');
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
    const { name, player } = data;

    if (this._lobbyService.joinLobby(name, player)) {
      client.join(name)
    }

    client.emit('actions', {
      type: LobbyActions.joinedLobby,
      payload: name,
    });

    // send to all in the room the updated player list
    client.in(name).emit('actions', {
      type: LobbyActions.playersUpdated,
      payload: this._lobbyService.lobbies.get(name),
    });

    return {
      event: 'actions',
      data: {
        type: LobbyActions.playersUpdated,
        payload: this._lobbyService.lobbies.get(name),
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

    client.to(data.name).emit('actions', {
      type: LobbyActions.playersUpdated,
      payload: this._lobbyService.lobbies.get(name),
    });
  }
}
