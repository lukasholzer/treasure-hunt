// tslint:disable: no-bitwise

export enum CardType {
  Empty = 1 << 0,
  Gold = 1 << 1,
  Fire = 1 << 2,
  Guardian = 1 << 3,
  Adventurer = 1 << 4,
  GameCards = Gold | Fire | Empty,
  Characters = Guardian | Adventurer
}

export interface GameConfiguration {
  players: number;
  empty: number;
  gold: number;
  fire: number;
  guardians: number;
  adventurers: number;
}

export const MIN_PLAYERS = 3;
export const MAX_PLAYERS = 10;

export const GAME_CONFIGURATION: GameConfiguration[] = [
  { players: 3, empty: 8, gold: 5, fire: 2, guardians: 2, adventurers: 2 },
  { players: 4, empty: 12, gold: 6, fire: 2, guardians: 3, adventurers: 2 },
  { players: 5, empty: 16, gold: 7, fire: 2, guardians: 3, adventurers: 2 },
  { players: 6, empty: 20, gold: 8, fire: 2, guardians: 4, adventurers: 2 },
  { players: 7, empty: 26, gold: 7, fire: 2, guardians: 5, adventurers: 3 },
  { players: 8, empty: 30, gold: 8, fire: 2, guardians: 6, adventurers: 3 },
  { players: 9, empty: 34, gold: 9, fire: 2, guardians: 6, adventurers: 3 },
  { players: 10, empty: 38, gold: 10, fire: 3, guardians: 7, adventurers: 4 }
];

/**
 * Generates the card deck for the provided number of players.
 * @param numberOfPlayers The number of players that are playing this game
 */
export function generateDeck(numberOfPlayers: number) {
  if (numberOfPlayers < MIN_PLAYERS || numberOfPlayers > MAX_PLAYERS) {
    throw new Error(
      `The game can only be played with at least ${MIN_PLAYERS} and maximum ${MAX_PLAYERS} players.`
    );
  }


  const { empty, gold, fire, guardians, adventurers } = GAME_CONFIGURATION.find(
    ({ players }) => players === numberOfPlayers
  );

  return [
    ...generateCardsOfType(empty, CardType.Empty),
    ...generateCardsOfType(gold, CardType.Gold),
    ...generateCardsOfType(fire, CardType.Fire),
    ...generateCardsOfType(guardians, CardType.Guardian),
    ...generateCardsOfType(adventurers, CardType.Adventurer)
  ];
}

/**
 * Generates a set of cards from a provided type.
 * @param count The number of cards that should be generated
 * @param type The type of the card as bit number
 */
export function generateCardsOfType(count: number, type: CardType): CardType[] {
  return Array.from({ length: count }, () => type);
}

export const getRoleCards = (cards: CardType[]) =>
  cards.filter(card => Boolean(card & CardType.Characters));
export const getGameCards = (cards: CardType[]) =>
  cards.filter(card => Boolean(card & CardType.GameCards));

export const isFire = (card: CardType) => Boolean(card & CardType.Fire);
export const isGold = (card: CardType) => Boolean(card & CardType.Gold);
export const isEmpty = (card: CardType) => Boolean(card & CardType.Empty);

export function countFiresInCollection(collection: number[]): number {
  return 1;
}

/**
 * Shuffles a deck of cards.
 * Implementing the Fisher-Yates algorithm.
 * @param deck The deck of cards that should be shuffled
 */
export function shuffleDeck<T>(deck: T[]): T[] {
  // clone the deck to prevent mutation
  const cloned = [...deck];

  for (let i = 0, max = cloned.length; i < max; i++) {
    // choose a random not-yet-placed item to place there
    // must be an item AFTER the current item, because the stuff
    // before has all already been placed
    const randomIndex = generateRandomNumber(i, cloned.length - 1);

    // place the random choice in the spot by swapping
    [cloned[i], cloned[randomIndex]] = [cloned[randomIndex], cloned[i]];
  }

  return cloned;
}

/**
 * Generates a random number between the provided Numbers
 * @param floor The minimum number the random value can take alias floor
 * @param ceiling The maximum number for the random value alias ceiling
 */
export function generateRandomNumber(floor: number, ceiling: number): number {
  return Math.floor(Math.random() * (ceiling - floor + 1)) + floor;
}
