import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { MESSAGE_TYPES, Player, Character } from '@witch-hunter/api-interfaces';
import { Socket } from 'ngx-socket-io';
import * as Actions from './game.actions';
import * as GameSelectors from './game.selectors';
import { GamePartialState } from './game.state';
import { withLatestFrom, map, filter, take } from 'rxjs/operators';

@Injectable()
export class GameFacade {
  _game$ = this._socket.fromEvent<any>(MESSAGE_TYPES.game);
  player$ = this._store.pipe(select(GameSelectors.getPlayer));
  character$ = this._store.pipe(select(GameSelectors.getCharacter));
  activePlayers$ = this._socket
    .fromEvent<Character[]>(MESSAGE_TYPES.playerJoined)
    .pipe(
      withLatestFrom(this.player$),
      map(([players, { email }]) =>
        players.filter(player => player.email !== email),
      ),
    );

  constructor(
    private _store: Store<GamePartialState>,
    private _socket: Socket,
  ) {
    this._socket.emit(MESSAGE_TYPES.game);

    this._game$
      .pipe(
        filter(game => game.started),
        take(1),
      )
      .subscribe(() => {
        this._store.dispatch(Actions.assignCharacter());
      });

    this._game$.subscribe(console.log);
  }

  joinGame() {
    this._store.dispatch(Actions.joinGame());
  }

  drawCard() {}
}
