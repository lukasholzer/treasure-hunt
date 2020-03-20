import { Component, ViewChild, ElementRef } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';

@Component({
  selector: 'witch-hunter-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('textarea', { static: true })
  private _textarea: ElementRef<HTMLTextAreaElement>;

  messages$ = new Observable(observer => {
    this.socket.on('game', message => {
      observer.next(message);
    });
  });

  constructor(private socket: Socket) {}

  sendMessage() {
    const data = {
      type: 'ClientMessage',
      value: this._textarea.nativeElement.value
    };
    this.socket.emit('game', data);
  }
}
