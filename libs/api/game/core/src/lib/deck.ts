import {
  generateDeck,
  shuffleDeck,
  getGameCards,
  getRoleCards,
} from './config';
import { CardType } from '@treasure-hunt/shared/interfaces';

export class Deck {
  roleCards: CardType[];
  gameCards: CardType[];
  revealed: CardType[] = [];

  constructor(private _playersCount: number) {
    const deck = generateDeck(this._playersCount);
    // there  can be more players card than players to put a random factor
    // in how many guardians can take part.
    this.roleCards = shuffleDeck(getRoleCards(deck)).slice(
      0,
      this._playersCount,
    );
    this.gameCards = shuffleDeck(getGameCards(deck));

    if (this.gameCards.length % this._playersCount !== 0) {
      throw Error('Something went wrong with dealing the cards');
    }
  }

  drawRole(): CardType {
    return this.roleCards.pop();
  }

  drawCard(): CardType {
    return this.gameCards.pop();
  }
}
