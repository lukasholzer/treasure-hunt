import { Injectable, Inject } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { shareReplay } from 'rxjs/operators';
import { API_ENDPOINT } from '@treasure-hunt/web/shared';
import { Player, GameMessageTypes } from '@treasure-hunt/shared/interfaces';

@Injectable()
export class GameService extends Socket {
  constructor(@Inject(API_ENDPOINT) api: string) {
    super({ url: `${api}game` });
    this.fromEvent('actions').subscribe(console.log);
  }

  actions$ = this.fromEvent('actions').pipe(shareReplay(1));

  revealCharacter(lobby: string, player: Player): void {
    this.emit(GameMessageTypes.revealCharacter, { lobby, player });
  }
}
