import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import {
  LeaveLobbyData,
  loginSuccess,
  SocketMessages,
} from '@treasure-hunt/shared/actions';
import { tap, withLatestFrom } from 'rxjs/operators';
import { SocketService } from '../../services';
import { socketConnected, socketDisconnected } from '../server.effects';
import { leaveLobby, logout } from './lobby.actions';
import { LobbyFacade } from './lobby.facade';

@Injectable()
export class LobbyEffects {
  @Effect({ dispatch: false })
  loginRedirect$ = this._actions$.pipe(
    ofType(loginSuccess),
    tap(() => {
      this._router.navigate(['/lobby']);
    }),
  );

  @Effect({ dispatch: false })
  disconnected$ = this._actions$.pipe(
    ofType(socketDisconnected, logout),
    tap(() => {
      this._router.navigate(['/lobby/login']);
    }),
  );

  @Effect({ dispatch: false })
  leaveLobby$ = this._actions$.pipe(
    ofType(leaveLobby),
    withLatestFrom(this._lobbyFacade.lobbyName$),
    tap(([, lobbyName]) => {
      this._socketService.sendMessage<LeaveLobbyData>(
        SocketMessages.LeaveLobby,
        { lobbyName },
      );
    }),
  );

  @Effect({ dispatch: false })
  reconnect$ = this._actions$.pipe(
    ofType(socketConnected),
    withLatestFrom(this._lobbyFacade.player$),
    tap(([, { name, image }]) => {
      if (name && image) {
        this._lobbyFacade.login(name, image);
      }
    }),
  );

  constructor(
    private _actions$: Actions,
    private _socketService: SocketService,
    private _lobbyFacade: LobbyFacade,
    private _router: Router,
  ) {}
}
