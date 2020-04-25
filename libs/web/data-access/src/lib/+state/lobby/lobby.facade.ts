import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { of } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';
import {
  JoinLobbyData,
  LoginData,
  SocketMessages,
} from '@treasure-hunt/shared/actions';
import { SocketService } from '../../services';
import * as LobbySelectors from './lobby.selectors';
import { LobbyPartialState } from './lobby.state';
import { leaveLobby } from './lobby.actions';

@Injectable()
export class LobbyFacade {
  player$ = this._store.pipe(select(LobbySelectors.getPlayer));
  /** Stream of the current lobby name */
  lobbyName$ = this._store.pipe(select(LobbySelectors.getLobbyName));
  /** Stream that emits if the minimum count of players is reached for the lobby */
  gameReady$ = this._store.pipe(select(LobbySelectors.getGameReady));
  /** Stream of all active players in the lobby */
  lobbyMembers$ = this._store.pipe(select(LobbySelectors.getAllLobbyMembers));

  constructor(
    private _store: Store<LobbyPartialState>,
    private _socketService: SocketService,
  ) {}

  /** Login with a username and a player profile */
  login(name: string, avatar: string) {
    this._socketService.sendMessage<LoginData>(SocketMessages.Login, {
      name,
      avatar,
    });
  }

  /** Joins a given lobby */
  joinLobby(lobbyName: string) {
    this._socketService.sendMessage<JoinLobbyData>(SocketMessages.JoinLobby, {
      lobbyName,
    });
  }

  leaveLobby() {
    this._store.dispatch(leaveLobby());
  }
}
