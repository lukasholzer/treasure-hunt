import { Injectable } from '@angular/core';
import { Action, select, Store } from '@ngrx/store';
import * as GameSelectors from './game.selectors';
import { GamePartialState } from './game.state';
import { CardType } from '@treasure-hunt/shared/interfaces';
import { tellHand, revealCard } from './game.actions';

@Injectable()
export class GameFacade {
  playerId$ = this._store.pipe(select(GameSelectors.getPlayerId));
  keyPlayer$ = this._store.pipe(select(GameSelectors.getKeyPlayer));
  players$ = this._store.pipe(select(GameSelectors.getAllPlayingPlayers));
  role$ = this._store.pipe(select(GameSelectors.getRole));
  hand$ = this._store.pipe(select(GameSelectors.getHand));
  rounds$ = this._store.pipe(select(GameSelectors.getRounds));
  revealed$ = this._store.pipe(select(GameSelectors.getRevealed));
  isKeyPlayer$ = this._store.pipe(select(GameSelectors.isKeyPlayer));

  constructor(private _store: Store<GamePartialState>) {}

  dispatch(action: Action) {
    this._store.dispatch(action);
  }

  tellHand(hand: CardType[]) {
    this._store.dispatch(tellHand({ hand }));
  }

  revealCard(playerId: string, cardIndex: number) {
    this._store.dispatch(revealCard({ playerId, cardIndex }));
  }
}
