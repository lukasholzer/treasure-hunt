import { Injectable } from '@angular/core';
import { Action, select, Store } from '@ngrx/store';
import {
  SocketMessages,
  LoginData,
  TellHandData,
  RevealCardData,
  JoinLobbyData,
} from '@treasure-hunt/shared/actions';
import { CardType } from '@treasure-hunt/shared/interfaces';
import { SocketService } from '../../services/socket.service';
import * as GameSelectors from './game.selectors';
import { GamePartialState } from './game.state';

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

  constructor(
    private _store: Store<GamePartialState>,
    private _socketService: SocketService,
  ) {}

  startGame() {
    this._socketService.sendMessage(SocketMessages.StartGame);
  }

  tellHand(hand: CardType[]) {
    this._socketService.sendMessage<TellHandData>(SocketMessages.TellHand, {
      hand,
    });
  }

  revealCard(playerId: string, cardIndex: number) {
    this._socketService.sendMessage<RevealCardData>(SocketMessages.RevealCard, {
      cardIndex,
      playerId,
    });
  }
}
