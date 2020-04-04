import { Injectable, Inject } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { shareReplay } from 'rxjs/operators';
import { API_ENDPOINT } from '@treasure-hunt/web/shared';

@Injectable()
export class GameService extends Socket {
  constructor(@Inject(API_ENDPOINT) api: string) {
    super({ url: `${api}game` });
    this.fromEvent('actions').subscribe(console.log);
  }

  actions$ = this.fromEvent('actions').pipe(shareReplay(1));

  start(name: string) {
    this.emit('joinLobby', name);
  }

  leave(name: string) {
    this.emit('leaveLobby', name);
  }
}
