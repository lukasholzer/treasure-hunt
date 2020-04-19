// tslint:disable: no-bitwise

export enum CardType {
  Back = 1 << 0,
  Empty = 1 << 1,
  Gold = 1 << 2,
  Fire = 1 << 3,
  Guardian = 1 << 4,
  Adventurer = 1 << 5,
  GameCards = Gold | Fire | Empty,
  Characters = Guardian | Adventurer,
}

export const isFire = (card: CardType) => Boolean(card & CardType.Fire);
export const isGold = (card: CardType) => Boolean(card & CardType.Gold);
export const isEmpty = (card: CardType) => Boolean(card & CardType.Empty);
