import { Injectable, Inject } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { shareReplay } from 'rxjs/operators';
import { API_ENDPOINT } from '@treasure-hunt/web/shared';
import { Player, GameMessageTypes, CardType } from '@treasure-hunt/shared/interfaces';

@Injectable()
export class GameService extends Socket {
  constructor(@Inject(API_ENDPOINT) api: string) {
    super({ url: `${api}game` });
    this.fromEvent('actions').subscribe(console.log);
  }

  actions$ = this.fromEvent('actions').pipe(shareReplay(1));

  /** Request the character role for this game */
  revealCharacter(lobby: string, player: Player): void {
    this.emit(GameMessageTypes.revealCharacter, { lobby, player });
  }
  /** Request the current hand from the server */
  getHand(lobby: string, player: Player): void {
    this.emit(GameMessageTypes.getHand, { lobby, player });
  }
  /** Calls the current hand to the other players */
  call(lobby: string, player: Player, hand: CardType[]): void {
    this.emit(GameMessageTypes.call, { lobby, player, hand });
  }
}
