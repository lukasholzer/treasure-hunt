import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { revealCharacter, startGame } from './game.actions';
import * as GameSelectors from './game.selectors';
import { GamePartialState } from './game.state';
import { of } from 'rxjs';

@Injectable()
export class GameFacade {
  // character$ = this._store.pipe(select(GameSelectors.getCharacter));
  // hand$ = this._store.pipe(select(GameSelectors.getHand));

  character$ = of(16);
  hand$ = of([1, 4, 2, 1, 4]);

  constructor(private _store: Store<GamePartialState>) {}

  /** Used for dispatching a start game action to server */
  startGame() {
    this._store.dispatch(startGame());
  }
  /** Dispatches an action to the server to reveal the character */
  revealCharacter() {
    this._store.dispatch(revealCharacter());
  }
}
