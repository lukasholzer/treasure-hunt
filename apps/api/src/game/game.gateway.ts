import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  WsResponse,
  WsException,
  OnGatewayDisconnect,
} from '@nestjs/websockets';

import { Socket, Server } from 'socket.io';
import { Logger } from '@nestjs/common';
import {
  GameActions,
  Player,
  GameMessageTypes,
  SocketAction,
  CardType,
} from '@treasure-hunt/shared/interfaces';
import { GameService } from './game.service';
import { PlayingPlayer } from '@treasure-hunt/api/game/core';

@WebSocketGateway({ namespace: '/game' })
export class GameGateway implements OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  private logger: Logger = new Logger('Game Gateway');

  constructor(private readonly _gameService: GameService) {}

  handleDisconnect(client: Socket) {
    console.log(client.rooms)
    // TODO:
    // handle client disconnects maybe dispatch the
    // playerUnavailable = '[GAME SOCKET] Player Unavailable',
    // Action to all others and if no reconnect is happening the game is ending.
  }

  @SubscribeMessage(GameMessageTypes.call)
  call(
    @MessageBody()
    data: { lobbyName: string; player: Player; hand: CardType[] },
    @ConnectedSocket() client: Socket,
  ) {
    const { lobbyName, player, hand } = data;
    // emit to all participants except sender
    client.to(lobbyName).emit('actions', {
      type: GameActions.playerCalled,
      payload: {
        player,
        hand,
      },
    });
  }

  @SubscribeMessage(GameMessageTypes.getHand)
  getHand(
    @MessageBody() data: { lobby: string; player: Player },
  ): WsResponse<SocketAction> {
    try {
      const playingPlayer = this._getPlayingPlayer(data.lobby, data.player)

      return {
        event: 'actions',
        data: {
          type: GameActions.getHand,
          payload: playingPlayer.hand,
        },
      };
    } catch (error) {
      throw new WsException(error.message);
    }
  }

  @SubscribeMessage(GameMessageTypes.revealCharacter)
  getCharacter(
    @MessageBody() data: { lobby: string; player: Player },
  ): WsResponse<SocketAction> {
    try {
      const playingPlayer = this._getPlayingPlayer(data.lobby, data.player)

      return {
        event: 'actions',
        data: {
          type: GameActions.getCharacterCard,
          payload: playingPlayer.role,
        },
      };
    } catch (error) {
      throw new WsException(error.message);
    }
  }

  /** Get a playing player out of a lobby */
  private _getPlayingPlayer(lobby: string, player: Player): PlayingPlayer {
    const game = this._gameService.getGame(lobby);
    const playingPlayer = game.players.find(({ id }) => player.id === id);

    if (!playingPlayer) {
      throw new Error(
        `Player <${player.name}> is not part of the lobby: ${lobby}`,
      );
    }
    return playingPlayer;
  }
}
