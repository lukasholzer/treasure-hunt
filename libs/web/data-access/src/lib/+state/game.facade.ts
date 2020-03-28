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
import { Observable, EMPTY } from 'rxjs';

@Injectable()
export class GameFacade {
  // _game$ = this._socket.fromEvent<any>(MESSAGE_TYPES.game);
  player$ = this._store.pipe(select(GameSelectors.getPlayer));
  lobby$ = this._store.pipe(select(GameSelectors.getLobby));
  character$ = this._store.pipe(select(GameSelectors.getCharacter));
  // allPlayers$ = this._game$.pipe(pluck('players'));
  activePlayers$: Observable<Player[]> = EMPTY;
  // this.allPlayers$.pipe(
  //   withLatestFrom(this.player$),
  //   map(([players, { id }]) => players.filter(player => player.id !== id)),
  // );

  constructor(private _store: Store<GamePartialState>) {
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

  login(name: string, image: string) {
    this._store.dispatch(
      Actions.login({
        name,
        image,
      }),
    );
  }

  joinLobby() {
    this._store.dispatch(Actions.joinLobby({ id: 'my-lobby-name' }));
  }

  drawCard() {}
}
