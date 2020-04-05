import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import { reducer as lobbyReducers } from './lobby/lobby.reducer';
import { reducer as GameReducers } from './game/game.reducer';
import { GamePartialState } from './game/game.state';
import { LobbyPartialState } from './lobby/lobby.state';

/** NGRX feature key of the store */
export const APP_FEATURE_KEY = 'app';

/** Data Access Module state */
export type AppModuleState = GamePartialState & LobbyPartialState;

/** Reducer map for the DataAccess store */
export const reducers: ActionReducerMap<GamePartialState &
  LobbyPartialState> = {
  lobby: lobbyReducers,
  game: GameReducers,
};

/** Data Access feature selector */
export const selectAppModuleState = createFeatureSelector<AppModuleState>(
  APP_FEATURE_KEY,
);

/** Lobby state selector */
export const selectLobbyState = createSelector(
  selectAppModuleState,
  (state: AppModuleState) => state.lobby,
);

/** Game state selector */
export const selectGameState = createSelector(
  selectAppModuleState,
  (state: AppModuleState) => state.game,
);
