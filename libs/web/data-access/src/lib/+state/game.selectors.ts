import { createFeatureSelector, createSelector } from '@ngrx/store';
import { GamePartialState, State, GAME_FEATURE_KEY } from './game.state';

// Lookup the 'Game' feature state managed by NgRx
export const getGameState = createFeatureSelector<GamePartialState, State>(
  GAME_FEATURE_KEY,
);

export const getPlayer = createSelector(
  getGameState,
  (state: State) => state.player,
);

export const getLobby = createSelector(
  getGameState,
  (state: State) => state.lobby,
);

export const getPlayers = createSelector(
  getGameState,
  (state: State) => state.players,
);

export const getGameStarted = createSelector(
  getGameState,
  (state: State) => state.started,
);

export const getCharacter = createSelector(
  getGameState,
  (state: State) => state.character,
);
