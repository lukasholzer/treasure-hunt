import { createSelector } from '@ngrx/store';
import { selectLobbyState } from '../reducers';
import { State } from './lobby.state';

export const getPlayer = createSelector(
  selectLobbyState,
  (state: State) => state.player,
);

export const getLobbyName = createSelector(
  selectLobbyState,
  (state: State) => state.lobbyName,
);

export const getPlayers = createSelector(
  selectLobbyState,
  (state: State) => state.players,
);
