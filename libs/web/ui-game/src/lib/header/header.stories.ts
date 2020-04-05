import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { select, text } from '@storybook/addon-knobs';
import { CardType, Player } from '@treasure-hunt/shared/interfaces';
import { uuid } from '@treasure-hunt/shared/util';
import { UiGameModule } from '../ui-game.module';
import { HeaderComponent } from './header.component';

export default {
  title: 'Header',
};

const avatar = {
  Unset: 0,
  Adventurer: CardType.Adventurer,
  Guardian: CardType.Guardian,
};

const player: Player = {
  name: 'Lukas',
  image: 'https://api.adorable.io/avatars/285/robero',
  id: uuid(),
};

export const normal = () => ({
  moduleMetadata: {
    imports: [UiGameModule],
  },
  component: HeaderComponent,
  props: {
    player: {
      id: uuid(),
      image: 'https://api.adorable.io/avatars/285/robero',
      name: text('Text', 'Lukas'),
    },
  },
});

export const revealed = () => ({
  moduleMetadata: {
    imports: [BrowserAnimationsModule, UiGameModule],
  },
  component: HeaderComponent,
  props: {
    player: {
      id: uuid(),
      image: 'https://api.adorable.io/avatars/285/robero',
      name: text('Text', 'Lukas'),
    },
    avatar: select('Avatar', avatar, CardType.Adventurer),
  },
});
