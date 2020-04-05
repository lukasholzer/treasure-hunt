import { CardType } from '@treasure-hunt/shared/interfaces';

export function getImageUrlForType(cardType: CardType): string {
  // tslint:disable-next-line: no-bitwise
  switch (cardType | 0) {
    case CardType.Adventurer:
      return 'adventurer';
    case CardType.Guardian:
      return 'guardian';
    case CardType.Fire:
      return 'fire';
    case CardType.Gold:
      return 'gold';
    case CardType.Empty:
      return 'empty';
  }
}
