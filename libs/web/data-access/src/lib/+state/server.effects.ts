import { Injectable } from '@angular/core';
import { createEffect } from '@ngrx/effects';
import { createAction, props } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { SocketService } from '../services/socket.service';

/** Sets the socket id */
export const socketConnected = createAction(
  '[SOCKET] Connected to socket',
  props<{ socketId: string }>(),
);

export const socketDisconnected = createAction('[SOCKET] Socket disconnected');

@Injectable()
export class ServerEffects {
  id$ = createEffect(() =>
    this._socketService.id$.pipe(
      map(socketId => socketConnected({ socketId })),
    ),
  );

  disconnect$ = createEffect(() =>
    this._socketService.disconnect$.pipe(map(() => socketDisconnected())),
  );

  createActions$ = createEffect(() => this._socketService.actions$);
  constructor(private _socketService: SocketService) {}
}
