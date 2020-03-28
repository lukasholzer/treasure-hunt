import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { merge, Observable } from 'rxjs';
import { shareReplay, map } from 'rxjs/operators';
import { props, Action, createAction } from '@ngrx/store';

@Injectable()
export class LobbyService extends Socket {
  constructor() {
    super({ url: 'http://localhost:3333/lobby' });
  }

  actions$ = this.fromEvent('actions').pipe(shareReplay(1));

  join(name: string) {
    this.emit('joinLobby', name);
  }

  leave(name: string) {
    this.emit('leaveLobby', name);
  }
}
