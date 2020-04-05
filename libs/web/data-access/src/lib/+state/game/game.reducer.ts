import { Action, createReducer, on } from '@ngrx/store';
import {
  gameStarted,
  revealCharacterSuccess,
  handUpdatedSuccess,
} from './game.actions';
import { initialState, State } from './game.state';

const gameReducer = createReducer(
  initialState,
  on(gameStarted, state => ({ ...state, started: true })),
  on(revealCharacterSuccess, (state, { character }) => ({
    ...state,
    character,
  })),
  on(handUpdatedSuccess, (state, { hand }) => ({ ...state, hand })),
);

export function reducer(state: State | undefined, action: Action) {
  return gameReducer(state, action);
}
