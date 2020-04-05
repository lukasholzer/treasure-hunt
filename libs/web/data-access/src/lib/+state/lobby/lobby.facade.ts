import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { of } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';
import { joinLobby, leaveLobby, lobbyReconnect, login } from './lobby.actions';
import * as LobbySelectors from './lobby.selectors';
import { LobbyPartialState } from './lobby.state';

@Injectable()
export class LobbyFacade {
  player$ = this._store.pipe(select(LobbySelectors.getPlayer));
  /** Stream of the current lobby name */
  lobbyName$ = this._store.pipe(select(LobbySelectors.getLobbyName));
  /** TODO: should be a response from a lobby */
  minPlayers$ = of(3);
  /** Stream of all active players in the lobby */
  allPlayers$ = this._store.pipe(select(LobbySelectors.getPlayers));
  /** Stream of all active players in the lobby excluding the user */
  activePlayers$ = this.allPlayers$.pipe(
    withLatestFrom(this.player$),
    map(([players = [], { id }]) => players.filter(player => player.id !== id)),
  );
  /** Stream that emits when the game is ready to play */
  gameReady$ = this.allPlayers$.pipe(
    withLatestFrom(this.minPlayers$),
    map(([players, min]) => players.length >= min),
  );

  constructor(private _store: Store<LobbyPartialState>) {}

  /** Try to reconnect to a old lobby that may be stored. */
  reconnect() {
    this._store.dispatch(lobbyReconnect());
  }

  login(name: string, image: string) {
    this._store.dispatch(login({ name, image }));
  }

  joinLobby(id: string) {
    this._store.dispatch(joinLobby({ id }));
  }

  leaveLobby() {
    this._store.dispatch(leaveLobby());
  }
}
