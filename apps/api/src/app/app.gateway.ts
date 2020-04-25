import { Logger } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
  OnGatewayInit,
} from '@nestjs/websockets';
import { MIN_PLAYERS } from '@treasure-hunt/api/game/core';
import {
  gameStarted,
  JoinLobbyData,
  joinLobbyFailed,
  joinLobbySuccess,
  playerLeftLobby,
  LoginData,
  loginFailed,
  loginSuccess,
  playerJoinedLobby,
  playerLeft,
  RevealCardData,
  SocketMessages,
  startGameFailed,
  TellHandData,
  leaveLobbySuccess,
} from '@treasure-hunt/shared/actions';
import { Player } from '@treasure-hunt/shared/interfaces';
import { Server, Socket } from 'socket.io';
import { GameService } from './game/game.service';
import { LobbyService } from './lobby/lobby.service';
import { RedisService } from 'nestjs-redis';
import { Redis } from 'ioredis';
import { PlayerService } from './player/player.service';

@WebSocketGateway({ transports: ['websocket'] })
export class AppGateway implements OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('App Gateway');

  constructor(
    private readonly _lobbyService: LobbyService,
    private readonly _gameService: GameService,
    private _playerService: PlayerService,
  ) {}

  async handleDisconnect(client: Socket) {
    const lobbyName = this._lobbyService.getJoinedLobby(client.id);
    this.logger.verbose(`Player Left the lobby <${lobbyName}`);
    if (lobbyName) {
      this.server.to(lobbyName).emit('actions', playerLeft());
      this._lobbyService.leaveLobby(lobbyName, client.id);
      this._gameService.resetGame(lobbyName);
    }
    this._playerService.logout(client.id);
  }

  @SubscribeMessage(SocketMessages.Login)
  async login(
    @ConnectedSocket() { id }: Socket,
    @MessageBody() data: LoginData,
  ) {
    const { name, avatar: image } = data;

    if (!name || !image) {
      return {
        event: 'actions',
        data: loginFailed({ message: 'No name or avatar provided!' }),
      };
    }

    const player: Player = { id, name, image };
    this._playerService.login(player);

    return {
      event: 'actions',
      data: loginSuccess({ player }),
    };
  }

  @SubscribeMessage(SocketMessages.JoinLobby)
  async joinLobby(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: JoinLobbyData,
  ): Promise<WsResponse> {
    const { lobbyName } = data;
    const player = await this._playerService.getPlayer(client.id);

    if (!player) {
      return {
        event: 'actions',
        data: joinLobbyFailed({ message: 'Please login first!' }),
      };
    }

    try {
      const players = this._lobbyService.joinLobby(lobbyName, player);
      this.server.to(lobbyName).emit('actions', playerJoinedLobby({ player }));
      client.join(lobbyName);
      return {
        event: 'actions',
        data: joinLobbySuccess({ players, minPlayers: MIN_PLAYERS, lobbyName }),
      };
    } catch (error) {
      this.logger.error(error.message);
    }
  }

  @SubscribeMessage(SocketMessages.LeaveLobby)
  leaveLobby(@ConnectedSocket() client: Socket) {
    const lobbyName = this._lobbyService.getJoinedLobby(client.id);
    this.logger.log(`Player left lobby ${lobbyName}`);
    try {
      this._lobbyService.leaveLobby(lobbyName, client.id);
      client.leave(lobbyName);

      this.server
        .to(lobbyName)
        .emit('actions', playerLeftLobby({ playerId: client.id }));

      return {
        event: 'actions',
        data: leaveLobbySuccess(),
      };
    } catch (error) {
      this.logger.error(error.message);
    }
  }

  @SubscribeMessage(SocketMessages.StartGame)
  startGame(@ConnectedSocket() client: Socket) {
    const lobbyName = this._lobbyService.getJoinedLobby(client.id);
    const lobby = this._lobbyService.getLobby(lobbyName);

    if (lobby.players.length >= MIN_PLAYERS) {
      this._gameService.startGame(lobby.players, lobbyName);
      this.server.to(lobbyName).emit('actions', gameStarted());
    } else {
      return {
        event: 'actions',
        data: startGameFailed({
          message: `Starting the game failed needed at least ${MIN_PLAYERS} players`,
        }),
      };
    }
  }

  @SubscribeMessage(SocketMessages.TellHand)
  tellHand(
    @ConnectedSocket() { id }: Socket,
    @MessageBody() data: TellHandData,
  ) {
    const lobbyName = this._lobbyService.getJoinedLobby(id);
    const { hand } = data;
    this.server
      .to(lobbyName)
      .emit('actions', this._gameService.pretendHand(id, hand));
  }

  @SubscribeMessage(SocketMessages.RevealCard)
  revealCard(
    @ConnectedSocket() { id }: Socket,
    @MessageBody() data: RevealCardData,
  ) {
    const lobbyName = this._lobbyService.getJoinedLobby(id);
    const { playerId, cardIndex } = data;
    this.server
      .to(lobbyName)
      .emit('actions', this._gameService.revealCard(id, playerId, +cardIndex));
  }

  @SubscribeMessage(SocketMessages.GetGameState)
  getGameState(@ConnectedSocket() { id }: Socket) {
    return {
      event: 'actions',
      data: this._gameService.getGameState(id),
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
