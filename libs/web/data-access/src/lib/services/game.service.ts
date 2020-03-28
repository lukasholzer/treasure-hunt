import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { shareReplay } from 'rxjs/operators';

@Injectable()
export class GameService extends Socket {
  constructor() {
    super({ url: 'http://localhost:3333/game' });
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
