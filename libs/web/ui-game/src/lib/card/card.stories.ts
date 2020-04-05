import { text, number, boolean, select, files } from '@storybook/addon-knobs';
import { CardComponent } from './card.component';
import { CardType } from '../../../../../shared/interfaces/src';

export default {
  title: 'Card',
};

const cards = {
  Adventurer: CardType.Adventurer,
  Guardian: CardType.Guardian,
  Fire: CardType.Fire,
  Gold: CardType.Gold,
  Empty: CardType.Empty,
};

export const card = () => ({
  component: CardComponent,
  props: {
    type: select('Card Type', cards, CardType.Guardian),
    flipped: boolean('Flipped', true),
    locked: boolean('Locked', false),
  },
});
