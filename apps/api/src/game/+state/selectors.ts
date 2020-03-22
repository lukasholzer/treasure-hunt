import { Observable } from 'rxjs';
import { pluck, map } from 'rxjs/operators';
import { GameState } from './store';
import { Character } from '@witch-hunter/api-interfaces';

/** Select all players in the game */
export const getPlayers = (state$: Observable<GameState>) =>
  state$.pipe(pluck('players'));

/** Select if the game has started or not */
export const hasGameStarted = (state$: Observable<GameState>) =>
  state$.pipe(pluck('started'));

/** Select if the game has started or not */
export const getCharacter = (
  state$: Observable<GameState>,
  player: Character,
) =>
  state$.pipe(
    map(({ players }) => players.find(({ email }) => player.email === email)),
    pluck('character'),
  );
