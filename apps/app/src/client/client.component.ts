import {
  Component,
  OnInit,
  ViewChildren,
  TemplateRef,
  QueryList,
  ViewChild,
} from '@angular/core';
import { SocketService } from './services/socket.service';
import {
  shareReplay,
  tap,
  filter,
  map,
  share,
  withLatestFrom,
} from 'rxjs/operators';
import { CardType } from '@treasure-hunt/shared/interfaces';
import { countBy } from 'lodash-es';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
  preserveWhitespaces: false,
})
export class ClientComponent {
  shouldShowPlayers = true;
  players: string[];

  isKeyPlayer = false;
  id$ = this._socketService.id$;

  actions$ = this._socketService.actions$.pipe(
    tap((a: any) => {
      console.log(a.type, a.payload);
    }),
    shareReplay(1),
  );

  gameState$ = this.actions$.pipe(
    filter(({ type }) => type === 'game-state'),
    map(({ payload }) => payload),
  );

  role$ = this.gameState$.pipe(map(({ role }) => this.getDisplay(role)));

  constructor(private _socketService: SocketService) {
    this.actions$.subscribe(action => {
      switch (action.type) {
        case 'player-left':
        case 'game-started':
          this._socketService.sendMessage({
            type: 'get-state',
          });
          break;
        case 'ask-hand':
          this.shouldShowPlayers = false;
          break;
      }
    });

    this.gameState$.pipe(withLatestFrom(this.id$)).subscribe(([state, id]) => {
      if (state) {
        this.isKeyPlayer = state.keyPlayer === id;
        this.players = state.players
          .filter(p => p.id !== id)
      }
    });
  }

  _tellHand(form: NgForm) {
    const hand = [];
    Object.keys(form.value).forEach(key => {
      hand.push(...generateCardsOfType(form.value[key], +key));
    });

    this._socketService.sendMessage({
      type: 'tell-hand',
      payload: { hand },
    });
    this.shouldShowPlayers = true;
  }

  _askPlayer(id: string) {
    this._socketService.sendMessage({
      type: 'ask-players-hand',
      payload: { id },
    });
  }

  _getOccurrences(hand: CardType[], type: CardType) {
    return countBy(hand)[type] || 0;
  }

  getDisplay(card: CardType): string {
    switch (card) {
      case CardType.Adventurer:
        return '👨🏻‍🌾';
      case CardType.Guardian:
        return '🧟‍♀️';
      case CardType.Gold:
        return '👑';
      case CardType.Empty:
        return '💨';
      case CardType.Fire:
        return '🔥';
    }
  }
}

// from api game config
export function generateCardsOfType(count: number, type: CardType): CardType[] {
  return Array.from({ length: count }, () => type);
}
