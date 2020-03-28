import { Player, CardType } from '@treasure-hunt/shared/interfaces';
import { uuid } from '@treasure-hunt/shared/util';
import {
  generateDeck,
  shuffleDeck,
  getRoleCards,
  getGameCards,
} from './config';
import { Deck } from './deck';

export interface PlayingPlayer extends Player {
  role: CardType;
  hand: CardType[];
}

export class Game {
  /** The list of all participating players in this game */
  players: PlayingPlayer[];
  /** The number of rounds to play */
  rounds: number;

  /** The read only unique id of the game */
  get id(): string {
    return this._id;
  }
  private _id = uuid();

  private _deck: Deck;

  constructor(players: Player[]) {
    // generate the deck for the amount of players
    this._deck = new Deck(players.length);
    // set the number of rounds to play
    this.rounds = this._deck.gameCards.length / players.length;
    // assign the roles to the players
    this.players = players.map(player => ({
      ...player,
      role: this._deck.drawRole(),
      hand: [],
    }));
    // start dealing game cards
    this._dealCards();
  }

  reveal(playerIndex: number, cardIndex): CardType {
    const card = this.players[playerIndex].hand.splice(cardIndex, 1);
    this._deck.revealed.push(card[0]);
    return card[0]
  }


  endRound() {
    this.players.forEach(player => {
      this._deck.gameCards.push(...player.hand);
    });
    this._clearHands();
    this.rounds -= 1;
    this._dealCards()
  }

  isFinished(): boolean {
    const fires = this._deck.revealed.filter(card => Boolean(card & CardType.Fire));
    const gold = this._deck.revealed.filter(card => Boolean(card & CardType.Gold));

    return Boolean(fires.length === 2 || gold.length === 5)
  }

  private _dealCards() {
    this._clearHands();

    // the index of the player that gets dealt
    let currentDealing = 0;

    while (this._deck.gameCards.length) {
      const player = this.players[currentDealing];
      player.hand.push(this._deck.drawCard());

      if (currentDealing < this.players.length - 1) {
        currentDealing++;
      } else {
        currentDealing = 0;
      }
    }
  }

  /** Clears the hand of every player */
  private _clearHands(): void {
    this.players = this.players.map(player => ({
      ...player,
      hand: [],
    }));
  }
}
