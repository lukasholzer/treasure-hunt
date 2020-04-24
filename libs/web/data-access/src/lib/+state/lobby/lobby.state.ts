import { Player } from '@treasure-hunt/shared/interfaces';
import { EntityState } from '@ngrx/entity';

export const LOBBY_FEATURE_KEY = 'lobby';

export interface State {
  /** The  player profile */
  player: Player | null;
  /** The id of the lobby */
  lobbyName: string | null;
  /** The minimum number of players that are required */
  minPlayers: number | null;
  /** The list of all players in the lobby */
  players: EntityState<Player>;
}

export interface LobbyPartialState {
  readonly [LOBBY_FEATURE_KEY]: State;
}
