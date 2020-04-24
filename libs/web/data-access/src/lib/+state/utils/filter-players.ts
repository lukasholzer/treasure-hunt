import { Player } from '@treasure-hunt/shared/interfaces';

/** Filters all players by a given player id */
export function filterPlayers<T extends Player>(
  players: T[],
  id: string,
): T[] {
  return players.filter(player => player.id !== id);
}
