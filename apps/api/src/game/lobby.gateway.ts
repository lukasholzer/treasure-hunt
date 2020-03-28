
import { SubscribeMessage, WebSocketGateway, OnGatewayInit, WebSocketServer, OnGatewayConnection } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { Logger } from '@nestjs/common';
import { LobbyActions } from "@treasure-hunt/shared/interfaces"

@WebSocketGateway({ namespace: '/lobby' })
export class LobbyGateway implements OnGatewayInit {

  @WebSocketServer() server: Server;

  private logger: Logger = new Logger('LobbyGateway');

  afterInit(server: any) {
    this.logger.log('Initialized!');
  }

  @SubscribeMessage('chatToServer')
  handleMessage(client: Socket, message: { sender: string, room: string, message: string }) {
    this.server.to(message.room).emit('chatToClient', message);
  }

  @SubscribeMessage('joinLobby')
  handleRoomJoin(client: Socket, lobby: string ) {
    client.join(lobby);
    console.log(client.rooms)
    client.emit('actions', {
      type: LobbyActions.joinedLobby,
      payload: lobby
    });
  }

  @SubscribeMessage('leaveLobby')
  handleRoomLeave(client: Socket, lobby: string ) {
    client.leave(lobby);
    client.emit('actions', {
      type: LobbyActions.leftLobby,
      payload: lobby
    });
  }

}
