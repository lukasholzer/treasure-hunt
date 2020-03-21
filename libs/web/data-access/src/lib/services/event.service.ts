import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { filter, map } from 'rxjs/operators';
import {
  SocketMessage,
  MESSAGE_TYPES,
  Player
} from '@witch-hunter/api-interfaces';
import { Observable } from 'rxjs';

@Injectable()
export class EventService {
  // TODO: Make private
  events$ = this._socket.fromEvent<SocketMessage>('events');

  activePlayers$: Observable<Player[]> = this.events$.pipe(
    filter(event => event.type === MESSAGE_TYPES.playerJoined),
    map(({ value }) => value)
  );

  constructor(private _socket: Socket) {}
}
