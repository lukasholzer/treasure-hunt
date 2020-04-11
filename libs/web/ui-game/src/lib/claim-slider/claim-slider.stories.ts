import { ClaimSlider } from './claim-slider';
import { UiGameModule } from '../ui-game.module';
import { select } from '@storybook/addon-knobs';
import { CardType } from '../../../../../shared/interfaces/src';

export default {
  title: 'Claim Slider',
};

const types = {
  Fire: CardType.Fire,
  Gold: CardType.Gold,
};


export const normal = () => ({
  moduleMetadata: {
    imports: [UiGameModule],
  },
  component: ClaimSlider,
  props: {


    type: select('Type', types, CardType.Gold),
  },
});
