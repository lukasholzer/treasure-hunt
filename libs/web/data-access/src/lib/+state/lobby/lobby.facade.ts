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
  // allPlayers$ = this._store.pipe(select(LobbySelectors.getPlayers));

  allPlayers$ = of([
    {
      name: 'Kasti',
      image: 'https://api.adorable.io/avatars/285/Kasti',
      id: '159c0629-7348-4c49-a60f-d3f8e1505277',
    },
    {
      name: 'Lukas',
      image: 'https://api.adorable.io/avatars/285/Lukas',
      id: '5295d391-3617-46b5-a6c6-2bff71511511',
    },
    {
      name: 'Kathi',
      image: 'https://api.adorable.io/avatars/285/Kathi',
      id: '6c9212fa-28b7-4b78-9d8f-b0b32d1c6304',
    },
    {
      name: 'Nadi',
      image: 'https://api.adorable.io/avatars/285/Nadi',
      id: '59197f08-bd4d-4f95-ba1e-5e5608ae3a09',
    },
  ]);
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
