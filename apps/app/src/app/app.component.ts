import { Component, ViewChild, ElementRef } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { PlayerService,  } from './player.service';
import { MESSAGE_TYPES, Player } from '@witch-hunter/api-interfaces';
import { filter, map, tap } from 'rxjs/operators';
import { stringify } from 'querystring';

@Component({
  selector: 'witch-hunter-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('text')
  private _textarea: ElementRef<HTMLTextAreaElement>;

  allPlayers$ = this.socket
    .fromEvent('ALL_PLAYERS')
    .pipe(map((players: Player[]) => players.map(({ name }) => name)));

  player: Player;

  messages: any[] = [];

  constructor(private socket: Socket, private playerService: PlayerService) {
    playerService.player$.subscribe(player => {
      this.player = player;
      this.socket.emit('events', {
        type: MESSAGE_TYPES.joinGame,
        value: player
      });
    });
  }

  startGame(): void {
    const data = {
      type: MESSAGE_TYPES.startGame,
    };
    this.socket.emit('game', data);
  }
}
