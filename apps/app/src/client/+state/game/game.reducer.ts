import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import {
  cardRevealSuccess,
  getGameStateSuccess,
  getPlayerInfoSuccess,
  playerLeft,
  playerPretendedHand,
} from '@treasure-hunt/shared/actions';
import { PlayingPlayer } from '@treasure-hunt/shared/interfaces';
import { setPlayerId } from './game.actions';
import { State } from './game.state';

export const playerAdapter: EntityAdapter<PlayingPlayer> = createEntityAdapter<
  PlayingPlayer
>();

export const initialState: State = {
  playerId: null,
  winner: null,
  players: playerAdapter.getInitialState(),
};

const gameReducer = createReducer(
  initialState,
  on(setPlayerId, (state, { playerId }) => ({ ...state, playerId })),
  // on(playerJoined, (state, { players }) => ({
  //   ...state,
  //   players: playerAdapter.setAll(players, state.players),
  // })),
  on(playerLeft, state => initialState),
  on(
    getGameStateSuccess,
    (state, { roundsLeft, keyPlayer, revealed, players, winner }) => ({
      ...state,
      roundsLeft,
      keyPlayer,
      revealed,
      winner,
      players: playerAdapter.setAll(players, state.players),
    }),
  ),
  on(getPlayerInfoSuccess, (state, { role, hand }) => ({
    ...state,
    role,
    hand,
  })),
  on(playerPretendedHand, (state, { hand, playerId }) => ({
    ...state,
    players: playerAdapter.updateOne(
      { id: playerId, changes: { pretendedHand: hand } },
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
