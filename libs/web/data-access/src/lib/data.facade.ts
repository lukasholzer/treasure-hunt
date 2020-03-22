import { Injectable } from '@angular/core';
import { PlayerService } from './services/player.service';
import { Socket } from 'ngx-socket-io';
import { MESSAGE_TYPES } from '@witch-hunter/api-interfaces';
import { EventService } from './services/event.service';

@Injectable()
export class DataFacade {
  player$ = this._playerService.player$;
  activePlayers$ = this._eventService.activePlayers$;

  constructor(
    private _playerService: PlayerService,
    private _eventService: EventService,
    private _socket: Socket,
  ) {
    this.player$.subscribe(player => {});

    this._eventService.events$.subscribe(console.log);
  }
}
