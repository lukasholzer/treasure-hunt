import { Component, ViewChild, ElementRef } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { PlayerService, Player } from './player.service';
import { MESSAGE_TYPES } from '@witch-hunter/api-interfaces';
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

  player: Player;

  messages: any[] = [];

  constructor(private socket: Socket, private playerService: PlayerService) {
    playerService.player$.subscribe(player => {
      this.player = player;
      this.socket.emit('game', { type: MESSAGE_TYPES.joinRoom, value: player });
    });

    this.socket
      .fromEvent<{ type: string; value: any }>('game')
      .pipe(
        tap(console.log),
        filter(({ type }) => type === MESSAGE_TYPES.sendMessage),
        map(({ value }) => value)
      )
      .subscribe(message => {
        this.messages.push(message);
      });
  }

  sendMessage(): void {
    const data = {
      type: MESSAGE_TYPES.sendMessage,
      value: {
        author: this.player.name,
        message: this._textarea.nativeElement.value
      }
    };
    this.socket.emit('game', data);
  }
}
