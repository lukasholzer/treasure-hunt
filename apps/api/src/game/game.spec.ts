import { Game, PlayingPlayer } from './game';
import { Player, CardType } from '@treasure-hunt/shared/interfaces';
import { uuid } from '@treasure-hunt/shared/util';
import { GAME_CONFIGURATION, getRoleCards } from './config';

const players: Player[] = [
  { name: 'Lukas', image: '', id: uuid() },
  { name: 'Kasti', image: '', id: uuid() },
  { name: 'Kathi', image: '', id: uuid() },
  { name: 'Hartwig', image: '', id: uuid() },
];

it('', () => {
  displayInfo(players.length);
  const game = new Game(players);
  // printPlayers(game.players);

  while(!game.isFinished() || game.rounds < 0) {
    console.log('R: ', game.rounds)
    for(let i = 0, max = game.rounds; i < max; i++) {
      const card = game.reveal(0,0);
      console.log('Revealed: ', getDisplay(card));
    }

    console.log('REVEALED: ', game['_deck'].revealed.map(card => getDisplay(card)).join(' '))
    game.endRound();
  }

  console.log(`Finished after ${game.rounds} rounds`);

  printPlayers(game.players);
});

function displayInfo(playerCount: number): void {
  const config = GAME_CONFIGURATION.find(
    ({ players }) => players === playerCount,
  );

  console.log(`

-----------------------
GAME INFORMATION:
-----------------------
| 👑 ${config.gold} | 🔥 ${config.fire} | 💨 ${config.empty} |
-----------------------
  `);
}

function printPlayers(players: PlayingPlayer[]): void {
  players.forEach(player => {
    console.log(`${player.name}: ${getDisplay(player.role)}
${player.hand.map(card => getDisplay(card)).join(' ')}`);
  });
}

function getDisplay(card: CardType): string {
  switch (card) {
    case CardType.Adventurer:
      return '👨🏻‍🌾';
    case CardType.Guardian:
      return '🧟‍♀️';
    case CardType.Gold:
      return '👑';
    case CardType.Empty:
      return '💨';
    case CardType.Fire:
      return '🔥';
  }
}
