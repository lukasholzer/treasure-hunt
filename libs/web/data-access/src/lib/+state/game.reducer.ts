import { Action, createReducer, on } from '@ngrx/store';
import { uuid } from '@treasure-hunt/shared/util'
import { initialState, State } from './game.state';
import * as GameActions from './game.actions';

const gameReducer = createReducer(
  initialState,
  on(GameActions.login, (state, {name, image}) => ({
    ...state,
    player: {
      name,
      image,
      id: uuid()
    }
  })),
  on(GameActions.joinGameSuccess, (state, { player }) => ({
    ...state,
    player,
  })),
  on(GameActions.assignCharacterSuccess, (state, { character }) => ({
    ...state,
    character,
  })),
  // on(GameActions.loadGameSuccess, (state, { game }) =>
  //   gameAdapter.addAll(game, { ...state, loaded: true })
  // ),
  // on(GameActions.loadGameFailure, (state, { error }) => ({ ...state, error }))
);

export function reducer(state: State | undefined, action: Action) {
  return gameReducer(state, action);
}
