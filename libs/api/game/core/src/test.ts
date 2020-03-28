// export * from './lib/game';
import { Game, PlayingPlayer } from './lib/game';
import { Player, CardType } from '@treasure-hunt/shared/interfaces';
import { uuid } from '@treasure-hunt/shared/util';
import { GAME_CONFIGURATION } from './lib/config';

const players: Player[] = [
  { name: 'Lukas', image: '', id: uuid() },
  { name: 'Kasti', image: '', id: uuid() },
  { name: 'Kathi', image: '', id: uuid() },
  { name: 'Hartwig', image: '', id: uuid() },
];

const game = new Game(players);

while (!game.isFinished() && game.rounds >= 0) {
  console.log(`___________________________`);
  console.log(`ROUND: ${game.rounds}`);
  console.log(`---------------------------`);

  console.log(
    'CARDS in HAND: ',
    game.players.map(p => p.hand.map(c => getDisplay(c))),
  );

  for (let i = 0, max = game.rounds; i < max; i++) {
    const card = game.reveal(0, 0);
    console.log('REVEALED: ' + getDisplay(card));
  }

  game.finishRound();
}

console.log(`Finished after ${game.rounds} rounds`);
if (game.adventurersHaveWon()) {
  console.log('The Adventurers have won!');
} else {
  console.log('The Guardins have won!');
}

printPlayers(game.players);

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
