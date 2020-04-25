import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType, Effect } from '@ngrx/effects';
import {
  JoinLobbyData,
  loginSuccess,
  SocketMessages,
  LeaveLobbyData,
} from '@treasure-hunt/shared/actions';
import { tap, withLatestFrom } from 'rxjs/operators';
import { SocketService } from '../../services';
import { LobbyFacade } from './lobby.facade';
import { socketDisconnected } from '../server.effects';
import { leaveLobby } from './lobby.actions';

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
    ofType(socketDisconnected),
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

  // reconnectLobby$ = createEffect(
  //   () =>
  //     this._actions$.pipe(
  //       ofType(lobbyReconnect),
  //       withLatestFrom(this._lobbyFacade.lobbyName$),
  //       tap(([, lobbyName]) => {
  //         if (lobbyName) {
  //           this._socketService.sendMessage<JoinLobbyData>(
  //             SocketMessages.JoinLobby,
  //             { lobbyName },
  //           );
  //         }
  //       }),
  //     ),
  //   { dispatch: false },
  // );

  constructor(
    private _actions$: Actions,
    private _socketService: SocketService,
    private _lobbyFacade: LobbyFacade,
    private _router: Router,
  ) {}
}
