import { Player } from '@treasure-hunt/shared/interfaces';

export const LOBBY_FEATURE_KEY = 'lobby';

export interface State {
  /** The  player profile */
  player: Player | null;
  /** The id of the lobby */
  lobbyName: string | null;
  /** The list of all players in the lobby */
  players: Player[];
}

export interface LobbyPartialState {
  readonly [LOBBY_FEATURE_KEY]: State;
}

export const initialState: State = {
  player: null,
  lobbyName: null,
  players: [],
};
