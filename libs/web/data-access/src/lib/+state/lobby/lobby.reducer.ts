import { Action, createReducer, on } from '@ngrx/store';
import { uuid } from '@treasure-hunt/shared/util';
import { gameStarted } from '../game/game.actions';
import {
  joinedLobbySuccess,
  leaveLobbySuccess,
  login,
  playersUpdated,
  revealCharacterSuccess,
} from './lobby.actions';
import { initialState, State } from './lobby.state';
import { Player } from '@treasure-hunt/shared/interfaces';

const createPlayer = (name, image): Player => ({
  name,
  image,
  id: uuid(),
});

const gameReducer = createReducer<State>(
  initialState,
  on(login, (state, { name, image }) => ({
    ...state,
    player: createPlayer(name, image),
  })),
  on(joinedLobbySuccess, (state, { id }) => ({ ...state, lobbyName: id })),
  on(playersUpdated, (state, { players }) => ({ ...state, players })),
  on(leaveLobbySuccess, state => ({ ...state, lobbyName: null, players: [] })),
);

export function reducer(state: State | undefined, action: Action) {
  return gameReducer(state, action);
}
