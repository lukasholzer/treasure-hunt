import { createFeatureSelector, createSelector } from '@ngrx/store';
import { playerAdapter } from './game.reducer';
import { State, GamePartialState, GAME_FEATURE_KEY } from './game.state';
import { CardType } from '@treasure-hunt/shared/interfaces';

// Lookup the 'Game' feature state managed by NgRx
export const getGameState = createFeatureSelector<GamePartialState, State>(
  GAME_FEATURE_KEY,
);

const { selectAll, selectEntities } = playerAdapter.getSelectors();

export const getPlayerId = createSelector(
  getGameState,
  (state: State) => state.playerId,
);

export const getGameError = createSelector(
  getGameState,
  (state: State) => state.error,
);

export const getAllPlayers = createSelector(getGameState, (state: State) =>
  selectAll(state.players),
);

export const getPlayerEntities = createSelector(getGameState, (state: State) =>
  selectEntities(state.players),
);

export const getKeyPlayerId = createSelector(
  getGameState,
  (state: State) => state.keyPlayer,
);

export const getKeyPlayer = createSelector(
  getPlayerEntities,
  getKeyPlayerId,
  (entities, id) => id && entities[id],
);

export const getAllPlayingPlayers = createSelector(
  getAllPlayers,
  getPlayerId,
  (players, id) => players.filter(player => player.id !== id),
);

export const isKeyPlayer = createSelector(
  getPlayerId,
  getKeyPlayerId,
  (playerId, keyPlayerId) => playerId === keyPlayerId,
);

export const getRole = createSelector(
  getGameState,
  (state: State) => state.role,
);

export const getHand = createSelector(
  getGameState,
  (state: State) => state.hand,
);

export const getRounds = createSelector(
  getGameState,
  (state: State) => state.rounds,
);

export const getRevealed = createSelector(
  getGameState,
  (state: State) => state.revealed,
);
