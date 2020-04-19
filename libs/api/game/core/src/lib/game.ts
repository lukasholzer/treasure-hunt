import {
  CardType,
  Player,
  PlayingPlayer,
} from '@treasure-hunt/shared/interfaces';
import { uuid } from '@treasure-hunt/shared/util';
import { GameConfiguration, GAME_CONFIGURATION } from './config';
import { Deck } from './deck';

export const HAND_CARD_INDEX_NOT_FOUND = (
  cardCount: number,
  cardIndex: number,
) =>
  `Cannot reveal card at the index ${cardIndex} because there are only ${cardCount} cards.`;

export interface PrivatePlayingPlayer extends PlayingPlayer {
  role: CardType;
  hand: CardType[];
}

export class Game {
  /** The list of all participating players in this game */
  _players: PrivatePlayingPlayer[];
  /** The number of rounds to play */
  rounds: number;
  /** The id of the player that is deciding */
  keyPlayer: string;
  /** Number of moves per round */
  moves = 0;

  /** The read only unique id of the game */
  get id(): string {
    return this._id;
  }

  get players(): PlayingPlayer[] {
    return this._players.map(player => ({
      ...player,
      role: undefined,
      hand: undefined,
    }));
  }

  get deck() {
    return this._deck.toJSON();
  }

  private _id = uuid();
  /** The card deck that is used for the game */
  private _deck: Deck;
  /** The current game configuration */
  private _config: GameConfiguration;

  constructor(players: Player[]) {
    this._config = GAME_CONFIGURATION.find(
      config => config.players === players.length,
    );
    // generate the deck for the amount of players
    this._deck = new Deck(players.length);
    // set the number of rounds to play
    this.rounds = this._deck.gameCards.length / players.length;
    // set the key player that should start
    this.keyPlayer = players[Math.floor(Math.random() * players.length)].id;
    // assign the roles to the players
    this._players = players.map(player => ({
      ...player,
      role: this._deck.drawRole(),
      hand: [],
      revealed: [],
      pretendedHand: [],
    }));
    // start dealing game cards
    this._dealCards();
  }

  /** Get the index of a player */
  getPlayerIndex(id: string): number {
    return this._players.findIndex(player => player.id === id);
  }

  getPlayerById(id: string): PrivatePlayingPlayer {
    return this._players.find(player => player.id === id);
  }

  /** Reveals a card from a player */
  reveal(playerId: string, cardIndex: number): CardType {
    const player = this.getPlayerById(playerId);

    if (cardIndex >= player.hand.length) {
      throw new Error(HAND_CARD_INDEX_NOT_FOUND(player.hand.length, cardIndex));
    }

    if (player.revealed[cardIndex] !== CardType.Back) {
      throw new Error('Card already revealed!');
    }
    const card = player.hand[cardIndex];
    player.revealed[cardIndex] = card;
    this._deck.revealed.push(card);
    this.moves ++;
    return card;
  }

  /** A player pretends to have this hand */
  pretend(playerIndex: number, hand: CardType[]): void {
    this._players[playerIndex].pretendedHand = hand;
  }

  /** Finishes a round and deals the cards again */
  finishRound() {
    this._players.forEach(player => {
      this._deck.gameCards.push(...player.hand);
    });
    this._clearHands();
    this.rounds -= 1;
    this.moves = 0
    this._dealCards();
  }

  /** Checks if the game is over */
  isFinished(): CardType | null {
    const fires = this._deck.revealed.filter(card => card & CardType.Fire);
    const gold = this._deck.revealed.filter(card => card & CardType.Gold);

    if (fires.length === this._config.fire) {
      return CardType.Guardian;
    }

    if (gold.length === this._config.gold) {
      return CardType.Adventurer;
    }

    return null;
  }

  /** @internal represents the game as json for internal debugging usage */
  toJSON(): object {
    return {
      id: this.id,
      rounds: this.rounds,
      keyPlayer: this.keyPlayer,
      deck: this._deck,
      winner: this.isFinished(),
      players: this._players,
    };
  }

  /** Deals the cards */
  private _dealCards() {
    this._clearHands();

    // the index of the player that gets dealt
    let currentDealing = 0;

    while (this._deck.gameCards.length) {
      const player = this._players[currentDealing];
      player.hand.push(this._deck.drawCard());
      player.revealed.push(CardType.Back);

      if (currentDealing < this._players.length - 1) {
        currentDealing++;
      } else {
        currentDealing = 0;
      }
    }
  }

  /** Clears the hand of every player */
  private _clearHands(): void {
    this._players = this._players.map(player => ({
      ...player,
      hand: [],
      revealed: [],
      pretendedHand: [],
    }));
  }
}
