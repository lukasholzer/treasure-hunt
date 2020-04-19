import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { setPlayerId } from './game.actions';
import { State, PlayerEntity } from './game.state';
import {
  playerJoined,
  getGameStateSuccess,
  playerPretendedHand,
  cardRevealSuccess,
  playerLeft,
} from '@treasure-hunt/shared/actions';

export const playerAdapter: EntityAdapter<PlayerEntity> = createEntityAdapter<
  PlayerEntity
>();

export const initialState: State = {
  playerId: null,
  players: playerAdapter.getInitialState(),
};

const gameReducer = createReducer(
  initialState,
  on(setPlayerId, (state, { playerId }) => ({ ...state, playerId })),
  on(playerJoined, (state, { players }) => ({
    ...state,
    players: playerAdapter.addMany(
      players.map(p => ({ ...p, pretendedHand: [], revealed: [] })),
      state.players,
    ),
  })),
  on(playerLeft, (state) => initialState),
  on(getGameStateSuccess, (state, { role, hand, rounds, keyPlayer }) => ({
    ...state,
    role,
    hand,
    rounds,
    keyPlayer,
  })),
  on(playerPretendedHand, (state, { hand, id }) => ({
    ...state,
    players: playerAdapter.updateOne(
      { id, changes: { pretendedHand: hand } },
      state.players,
    ),
  })),
  on(cardRevealSuccess, (state, { card, id }) => ({
    ...state,
    players: playerAdapter.updateOne(
      {
        id,
        changes: { revealed: [...state.players.entities[id].revealed, card] },
      },
      state.players,
    ),
  })),
);

export function reducer(state: State | undefined, action: Action) {
  return gameReducer(state, action);
}
