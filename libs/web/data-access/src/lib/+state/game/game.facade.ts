import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { revealCharacter, startGame } from './game.actions';
import * as GameSelectors from './game.selectors';
import { GamePartialState } from './game.state';

@Injectable()
export class GameFacade {
  character$ = this._store.pipe(select(GameSelectors.getCharacter));

  constructor(private _store: Store<GamePartialState>) {}

  startGame() {
    this._store.dispatch(startGame());
  }

  revealCharacter() {
    this._store.dispatch(revealCharacter());
  }

  drawCard() {}
}
