import { CardType } from './card';

export interface Character extends Player {
  character: CardType | null;
}

export interface Player {
  id: string;
  image: string;
  name: string;
}
