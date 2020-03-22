import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { MESSAGE_TYPES, Player } from '@witch-hunter/api-interfaces';
import { Socket } from 'ngx-socket-io';
import * as Actions from './game.actions';
import * as GameSelectors from './game.selectors';
import { GamePartialState } from './game.state';
import { withLatestFrom, map } from 'rxjs/operators';

@Injectable()
export class GameFacade {
  player$ = this._store.pipe(select(GameSelectors.getPlayer));
  character$ = this._store.pipe(select(GameSelectors.getCharacter));
  activePlayers$ = this._socket
    .fromEvent<Player[]>(MESSAGE_TYPES.playerJoined)
    .pipe(
      withLatestFrom(this.player$),
      map(([players, { email }]) =>
        players.filter(player => player.email !== email),
      ),
    );

  game$ = this._socket.fromEvent<any>(MESSAGE_TYPES.game);

  constructor(
    private _store: Store<GamePartialState>,
    private _socket: Socket,
  ) {
    this._socket.emit(MESSAGE_TYPES.game);
    this.game$.subscribe(console.log);
  }

  joinGame() {
    this._store.dispatch(Actions.joinGame());
  }

  assignCharacter() {
    this._store.dispatch(Actions.assignCharacter());
  }

  drawCard() {}
}
