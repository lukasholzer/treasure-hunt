import { createSelector } from '@ngrx/store';
import { selectLobbyState } from '../reducers';
import { State } from './lobby.state';
import { playerAdapter } from './lobby.reducer';
import { filterPlayers } from '../utils';

const { selectAll, selectEntities } = playerAdapter.getSelectors();

/** Get the Socket Id of the current player */
export const getPlayerId = createSelector(
  selectLobbyState,
  (state: State) => state.player?.id,
);

export const getPlayer = createSelector(
  selectLobbyState,
  (state: State) => state.player,
);

export const getMinPlayers = createSelector(
  selectLobbyState,
  (state: State) => state.minPlayers,
);

export const getAllPlayers = createSelector(selectLobbyState, (state: State) =>
  selectAll(state.players),
);

export const getPlayerEntities = createSelector(
  selectLobbyState,
  (state: State) => selectEntities(state.players),
);

export const getLobbyName = createSelector(
  selectLobbyState,
  (state: State) => state.lobbyName,
);

export const getAllLobbyMembers = createSelector(
  getAllPlayers,
  getPlayerId,
  (players, id) => filterPlayers(players, id),
);

export const getGameReady = createSelector(
  getAllPlayers,
  getMinPlayers,
  (players, minPlayers) => players.length >= minPlayers,
);
