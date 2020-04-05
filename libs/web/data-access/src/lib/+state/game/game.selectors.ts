import { createSelector } from '@ngrx/store';
import { selectGameState } from '../reducers';
import { State } from './game.state';

export const getGameStarted = createSelector(
  selectGameState,
  (state: State) => state.started,
);

export const getCharacter = createSelector(
  selectGameState,
  (state: State) => state.character,
);
