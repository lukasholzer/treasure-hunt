import { text, number, boolean, select, files } from '@storybook/addon-knobs';
import { AvatarComponent } from './avatar.component';

export default {
  title: 'Avatar',
};

const sizes = {
  Small: 'small',
  Large: 'large',
};

const cardCount = (label: string, count = 0) => number(label, count);


export const small = () => ({
  component: AvatarComponent,
  props: {
    image: text('Image', 'https://api.adorable.io/avatars/285/robero'),
    size: select('Size', sizes, undefined),
  },
});

export const smallWithStats = () => ({
  component: AvatarComponent,
  props: {
    image: text('Image', 'https://api.adorable.io/avatars/285/robero'),
    gold: cardCount('👑', 2),
    fire: cardCount('🔥', 1),
  },
});

export const large = () => ({
  component: AvatarComponent,
  props: {
    name: text('Name', 'Lukas'),
    image: text('Image', 'https://api.adorable.io/avatars/285/robero'),
    size: select('Size', sizes, undefined),
  },
});

export const largeWithStats = () => ({
  component: AvatarComponent,
  props: {
    name: text('Name', 'Lukas'),
    image: text('Image', 'https://api.adorable.io/avatars/285/robero'),
    size: select('Size', sizes, undefined),
    gold: cardCount('👑', 2),
    fire: cardCount('🔥', 1),
    empty: cardCount('💨', 2),
  },
});
