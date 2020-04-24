import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import {
  joinLobbySuccess,
  playerLeftLobby,
  loginSuccess,
  playerJoinedLobby,
  leaveLobbySuccess,
} from '@treasure-hunt/shared/actions';
import { Player } from '@treasure-hunt/shared/interfaces';
import { socketConnected, socketDisconnected } from '../server.effects';
import { State } from './lobby.state';

export const playerAdapter: EntityAdapter<Player> = createEntityAdapter<
  Player
>();

export const initialState: State = {
  player: null,
  lobbyName: null,
  minPlayers: null,
  players: playerAdapter.getInitialState(),
};

const gameReducer = createReducer<State>(
  initialState,
  on(socketConnected, (state, { socketId }) => ({
    ...state,
    player: {
      ...state.player,
      id: socketId,
    },
  })),
  on(socketDisconnected, () => initialState),
  on(loginSuccess, (state, { player }) => ({ ...state, player })),
  on(joinLobbySuccess, (state, { players, minPlayers, lobbyName }) => ({
    ...state,
    players: playerAdapter.setAll(players, state.players),
    minPlayers,
    lobbyName,
  })),
  on(leaveLobbySuccess, state => ({
    ...state,
    players: playerAdapter.getInitialState(),
    minPlayers: null,
    lobbyName: null,
  })),
  on(playerLeftLobby, (state, { playerId }) => ({
    ...state,
    players: playerAdapter.removeOne(playerId, state.players),
  })),
  on(playerJoinedLobby, (state, { player }) => ({
    ...state,
    players: playerAdapter.addOne(player, state.players),
  })),
);

export function reducer(state: State | undefined, action: Action) {
  return gameReducer(state, action);
}
