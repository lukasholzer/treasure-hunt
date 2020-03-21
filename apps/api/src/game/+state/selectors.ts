import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { GameState } from './store';

/** Select all players in the game */
export const getPlayers = (state$: Observable<GameState>) =>
  state$.pipe(pluck('players'));
