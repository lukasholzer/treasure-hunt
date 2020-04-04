import { Injectable, Inject } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { merge, Observable } from 'rxjs';
import { shareReplay, map } from 'rxjs/operators';
import { props, Action, createAction } from '@ngrx/store';
import { Player } from '@treasure-hunt/shared/interfaces';
import { API_ENDPOINT } from '@treasure-hunt/web/shared';

@Injectable()
export class LobbyService extends Socket {
  constructor(@Inject(API_ENDPOINT) api: string) {
    super({
      url: `${api}lobby`,
      options: {
        forceNew: true,
      },
    });
    this.fromEvent('actions').subscribe(console.log);
  }

  actions$ = this.fromEvent('actions').pipe(shareReplay(1));

  join(name: string, player: Player) {
    this.emit('joinLobby', { name, player });
  }

  leave(name: string, id: string) {
    this.emit('leaveLobby', { name, id });
  }
}
