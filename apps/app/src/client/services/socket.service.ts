import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
import { mapTo, map, share, take } from 'rxjs/operators';
import { Action } from '@ngrx/store';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private _url = 'http://localhost:3333';
  private _socket = io(this._url, {
    transports: ['websocket'],
  });

  constructor() {}

  sendMessage(data: any) {
    this._socket.emit('actions', data);
  }

  get id$() {
    return this.fromEvent('connect').pipe(
      map(() => this._socket.id),
    );
  }

  get actions$(): Observable<Action> {
    return this.fromEvent('actions');
  }

  private fromEvent<T>(event: string): Observable<T> {
    return new Observable((observer: any) => {
      this._socket.on(event, (data: T) => {
        observer.next(data);
      });
    }).pipe(share<T>());
  }
}
