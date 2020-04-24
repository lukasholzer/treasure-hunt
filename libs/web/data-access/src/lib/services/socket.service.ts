import { Injectable, Inject } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
import { mapTo, map, share, take } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import {
  API_CONFIGURATION_TOKEN,
  ApiConfiguration,
} from '@treasure-hunt/web/shared';

@Injectable()
export class SocketService {
  private _socket = io(this._config.url, {
    transports: ['websocket'],
  });

  constructor(
    @Inject(API_CONFIGURATION_TOKEN)
    private _config: ApiConfiguration,
  ) {}

  sendMessage<T>(event: string, data?: T) {
    this._socket.emit(event, data);
  }

  get id$() {
    return this.fromEvent('connect').pipe(map(() => this._socket.id));
  }

  get actions$(): Observable<Action> {
    return this.fromEvent('actions');
  }

  get disconnect$(): Observable<void> {
    return this.fromEvent('disconnect').pipe(mapTo(undefined));
  }

  private fromEvent<T>(event: string): Observable<T> {
    return new Observable((observer: any) => {
      this._socket.on(event, (data: T) => {
        observer.next(data);
      });
    }).pipe(share<T>());
  }
}
