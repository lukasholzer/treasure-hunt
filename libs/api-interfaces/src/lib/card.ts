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

export const isFire = (card: CardType) => Boolean(card & CardType.Fire);
export const isGold = (card: CardType) => Boolean(card & CardType.Gold);
export const isEmpty = (card: CardType) => Boolean(card & CardType.Empty);
