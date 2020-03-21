import { Game } from './game';
import { CardType } from './config';
import { Player } from '@witch-hunter/api-interfaces';

const players: Player[] = [
  { name: 'Lukas' } as Player,
  { name: 'Kasti' } as Player,
  { name: 'Nadi' } as Player,
  { name: 'Kasti' } as Player
];

console.log(CardType)

test('', () => {
  const game = new Game(players);
});
