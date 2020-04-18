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
import { GameFacade } from './+state/game/game.facade';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
  preserveWhitespaces: false,
})
export class ClientComponent {
  players$ = this._gameFacade.players$;
  playerId$ = this._gameFacade.playerId$;
  hand$ = this._gameFacade.hand$;
  role$ = this._gameFacade.role$;

  constructor(private _gameFacade: GameFacade) {}

  _tellHand(form: NgForm) {
    const hand = [];
    Object.keys(form.value).forEach(key => {
      hand.push(...generateCardsOfType(form.value[key], +key));
    });

    this._gameFacade.tellHand(hand);
  }

  _getOccurrences(hand: CardType[], type: CardType) {
    return countBy(hand)[type] || 0;
  }

  _getDisplay(card: CardType): string {
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
