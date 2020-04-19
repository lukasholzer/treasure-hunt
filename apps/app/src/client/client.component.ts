import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CardType } from '@treasure-hunt/shared/interfaces';
import { countBy } from 'lodash-es';
import { GameFacade } from './+state/game/game.facade';

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
  rounds$ = this._gameFacade.rounds$;
  revealed$ = this._gameFacade.revealed$;
  isKeyPlayer$ = this._gameFacade.isKeyPlayer$;

  constructor(private _gameFacade: GameFacade) {}

  _tellHand(form: NgForm) {
    const hand = [];
    Object.keys(form.value).forEach(key => {
      hand.push(...generateCardsOfType(form.value[key], +key));
    });

    this._gameFacade.tellHand(hand);
  }

  _login(name: string) {
    this._gameFacade.login(name);
  }

  _joinLobby(lobbyName: string) {
    this._gameFacade.joinLobby(lobbyName);
  }

  _reveal(playerId: string, cardIndex: number) {
    this._gameFacade.revealCard(playerId, cardIndex);
  }

  _getOccurrences(hand: CardType[], type: CardType) {
    return countBy(hand)[type] || 0;
  }

  _cardAlreadyRevealed(card: CardType): boolean {
    return card !== CardType.Back;
  }

  _getDisplay(card: CardType): string {
    switch (card) {
      case CardType.Back:
        return '🚪';
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
