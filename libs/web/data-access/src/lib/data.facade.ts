import { Injectable } from '@angular/core';
import { PlayerService } from './services/player.service';
import { Socket } from 'ngx-socket-io';
import { MESSAGE_TYPES } from '@witch-hunter/api-interfaces';

@Injectable()
export class DataFacade {
  player$ = this._playerService.player$;

  constructor(private _playerService: PlayerService, private _socket: Socket) {
    this.player$.subscribe(player => {
      this._socket.emit('events', {
        type: MESSAGE_TYPES.joinGame,
        value: player
      });
    });
  }
}
