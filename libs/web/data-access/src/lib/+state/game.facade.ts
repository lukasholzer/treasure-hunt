import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import {
  MESSAGE_TYPES,
  Player,
  Character,
} from '@treasure-hunt/shared/interfaces';
import { Socket } from 'ngx-socket-io';
import * as Actions from './game.actions';
import * as GameSelectors from './game.selectors';
import { GamePartialState } from './game.state';
import { withLatestFrom, map, filter, take, pluck } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';

@Injectable()
export class GameFacade {
  // _game$ = this._socket.fromEvent<any>(MESSAGE_TYPES.game);
  player$ = this._store.pipe(select(GameSelectors.getPlayer));
  /** Stream of the current lobby name */
  lobby$ = this._store.pipe(select(GameSelectors.getLobby));
  /** TODO: should be a response from a lobby */
  minPlayers$ = of(3)
  /** Stream of the current Character in the game */
  character$ = this._store.pipe(select(GameSelectors.getCharacter));
  /** Stream of all active players in the lobby */
  allPlayers$ = this._store.pipe(select(GameSelectors.getPlayers));
  /** Stream of all active players in the lobby excluding the user */
  activePlayers$ = this.allPlayers$.pipe(
    withLatestFrom(this.player$),
    map(([players = [], { id }]) => players.filter(player => player.id !== id)),
  );
  /** Stream that emits when the game is ready to play */
  gameReady$ = this.allPlayers$.pipe(
    withLatestFrom(this.minPlayers$),
    map(([players, min]) => players.length >= min)
  )

  constructor(private _store: Store<GamePartialState>) {
    // Try to reconnect to the lobby if there is one stored.
    // this._socket.emit(MESSAGE_TYPES.game);
    // this._game$
    //   .pipe(
    //     filter(game => game.started),
    //     take(1),
    //   )
    //   .subscribe(() => {
    //     this._store.dispatch(Actions.assignCharacter());
    //   });
    // this._game$.subscribe(console.log);
  }

  /** Try to reconnect to a old lobby that may be stored. */
  reconnect() {
    console.log('dispatch re connect')
    this._store.dispatch(Actions.lobbyReconnect());
  }

  login(name: string, image: string) {
    this._store.dispatch(
      Actions.login({
        name,
        image,
      }),
    );
  }

  joinLobby(id: string) {
    this._store.dispatch(Actions.joinLobby({ id }));
  }

  leaveLobby() {
    this._store.dispatch(Actions.leaveLobby());
  }

  drawCard() {}
}
